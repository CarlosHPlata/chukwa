import {
  CreateTransaction,
  GetTransactionByIdFromRepo,
  GetTransactionsByActiveMonth,
} from "@/domain/repositories/transactionRepository";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import * as schema from "@/db/schema";
import { Transaction } from "@/domain/entities/Transaction";
import { Builder } from "builder-pattern";
import { Concept } from "@/domain/entities/Concept";
import { Origin } from "@/domain/entities/Origin";

type GetTransactionsByActiveMonthFactory = (
  db: SQLiteDatabase,
) => GetTransactionsByActiveMonth;
export const getTransactionsByActiveMonth: GetTransactionsByActiveMonthFactory =
  (db) => async (activeMonthId) => {
    const dbresponse = await queryTransactions(db, activeMonthId);
    if (!dbresponse || dbresponse.length === 0) {
      return [];
    }

    return dbresponse.map((transactionDb) => {
      return Builder<Transaction>()
        .id(transactionDb.id.toString())
        .date(new Date(transactionDb.date * 1000))
        .concept(Builder<Concept>().icon(transactionDb.concept.icon).build())
        .description(transactionDb.description)
        .amount(transactionDb.amount)
        .total(0)
        .userId(["1"])
        .origin(Builder<Origin>().icon(transactionDb.origin.icon).build())
        .isWithdrawal(transactionDb.isWithdrawal === 1)
        .build();
    });
  };

type CreateTransactionFactory = (db: SQLiteDatabase) => CreateTransaction;
export const createTransaction: CreateTransactionFactory =
  (db) => async (transaction, activeMonthId) => {
    try {
      const drizzleDb = drizzle(db, { schema });
      await drizzleDb.insert(schema.transactions).values({
        date: Math.floor(transaction.date.getTime() / 1000),
        activeMonthId: activeMonthId,
        conceptId: parseInt(transaction.concept.id),
        description: transaction.description,
        amount: transaction.amount,
        isWithdrawal: transaction.isWithdrawal ? 1 : 0,
        originId: parseInt(transaction.origin.id),
        destinationId: parseInt(transaction.origin.id),
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw new Error("Failed to create transaction");
    }
  };

type GetTransactionsByIdFactory = (
  db: SQLiteDatabase,
) => GetTransactionByIdFromRepo;
export const getTransactionById: GetTransactionsByIdFactory =
  (db) => async (id) => {
    try {
      if (isNaN(parseInt(id))) {
        throw new Error("Invalid transaction ID");
      }

      const drizzleDb = drizzle(db, { schema });
      const transactionDb = await drizzleDb.query.transactions.findMany({
        where: (transactions, { eq }) => eq(transactions.id, parseInt(id)),
        with: {
          concept: true,
          origin: true,
        },
      });

      if (!transactionDb || transactionDb.length === 0) {
        throw new Error("Transaction not found");
      }

      const transaction = transactionDb[0];
      return Builder<Transaction>()
        .id(transaction.id.toString())
        .date(new Date(transaction.date * 1000))
        .concept(
          Builder<Concept>()
            .id(transaction.concept.id.toString())
            .name(transaction.concept.name)
            .icon(transaction.concept.icon)
            .build(),
        )
        .description(transaction.description)
        .amount(transaction.amount)
        .total(0)
        .userId(["1"])
        .origin(
          Builder<Origin>()
            .id(transaction.origin.id.toString())
            .name(transaction.origin.name)
            .icon(transaction.origin.icon)
            .build(),
        )
        .isWithdrawal(transaction.isWithdrawal === 1)
        .build();
    } catch (error) {
      console.error("Error fetching transaction by ID:", error);
      throw new Error("Failed to fetch transaction by ID");
    }
  };

const queryTransactions = async (db: SQLiteDatabase, activeMonthId: number) => {
  try {
    const drizzleDb = drizzle(db, { schema });
    return await drizzleDb.query.transactions.findMany({
      where: (transactions, { and, eq, ne }) =>
        and(
          eq(transactions.activeMonthId, activeMonthId),
          ne(transactions.deleted, 1),
        ),
      orderBy: (transactions, { desc }) => desc(transactions.date),
      with: {
        concept: {
          columns: {
            icon: true,
          },
        },
        origin: {
          columns: {
            icon: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
};
