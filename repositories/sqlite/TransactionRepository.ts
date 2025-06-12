import { DrizzleDb } from "@/components/DrizzleProvider";
import * as schema from "@/db/schema";
import {
  CreateTransaction,
  GetTransactionByIdFromRepo,
  GetTransactionsByActiveMonth,
} from "@/domain/repositories/transactionRepository";
import { mapTransactionDb } from "./TransactionMapper";

type GetTransactionsByActiveMonthFactory = (
  db: DrizzleDb,
) => GetTransactionsByActiveMonth;
export const getTransactionsByActiveMonth: GetTransactionsByActiveMonthFactory =
  (db) => async (activeMonthId) => {
    const dbresponse = await queryTransactions(db, activeMonthId);
    if (!dbresponse || dbresponse.length === 0) {
      return [];
    }

    return dbresponse.map((transactionDb) => {
      return mapTransactionDb(
        transactionDb,
        transactionDb.concept,
        transactionDb.origin,
      );
    });
  };

type CreateTransactionFactory = (drizzleDb: DrizzleDb) => CreateTransaction;
export const createTransaction: CreateTransactionFactory =
  (drizzleDb) => async (transaction, activeMonthId) => {
    try {
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
      const errorMessage: string =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message || "Unknown error"
          : (error as string);
      throw new Error("Failed to create transaction " + errorMessage);
    }
  };

type GetTransactionsByIdFactory = (
  drizzleDb: DrizzleDb,
) => GetTransactionByIdFromRepo;
export const getTransactionById: GetTransactionsByIdFactory =
  (drizzleDb) => async (id) => {
    try {
      if (isNaN(parseInt(id))) {
        throw new Error("Invalid transaction ID");
      }

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
      return mapTransactionDb(
        transaction,
        transaction.concept,
        transaction.origin,
      );
    } catch (error) {
      console.error("Error fetching transaction by ID:", error);
      const errorMessage: string =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message || "Unknown error"
          : (error as string);
      throw new Error("Failed to fetch transaction by ID " + errorMessage);
    }
  };

const queryTransactions = async (
  drizzleDb: DrizzleDb,
  activeMonthId: number,
) => {
  try {
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
    const errorMessage: string =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message || "Unknown error"
        : (error as string);
    throw new Error("Failed to fetch transactions - " + errorMessage);
  }
};
