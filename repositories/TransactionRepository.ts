import { Transaction } from "@/domain/entities/Transaction";
import {
  CreateTransaction,
  GetTransactionByIdFromRepo,
  GetTransactionsRepo,
} from "@/domain/repositories/transactionRepository";

let transactions: Transaction[] = [];

export const getTransactions: GetTransactionsRepo = () => {
  if (transactions.length > 0) return Promise.resolve(transactions);

  const length = 20;
  const newTransactions = Array.from({ length }, (_, i) => ({
    id: (i + 1).toString(),
    date: `2023-10-${((i % 30) + 1).toString().padStart(2, "0")}`,
    concept: {
      id: `C${(i % 10) + 1}`,
      name: `Concept ${(i % 10) + 1}`,
      icon: `icon${(i % 10) + 1}`, // Replace with actual Material icon names as needed
    },
    description: `Transaction ${i + 1}`,
    amount: (i + 1) * 100,
    total: (i + 1) * 100,
    userId: [`user${(i % 5) + 1}`],
    origin: {
      id: `O${(i % 10) + 1}`,
      name: `Origin ${(i % 10) + 1}`,
      icon: `icon${(i % 10) + 1}`, // Replace with actual Material icon names as needed
    },
    isWithdrawal: i % 2 === 0,
  }));

  transactions = newTransactions;
  return Promise.resolve(transactions);
};

export const getTransactionById: GetTransactionByIdFromRepo = (id: string) => {
  const transaction = {
    id: "20",
    date: "2023-10-20",
    concept: {
      id: "C1",
      name: "favorite",
      icon: "favorite",
    },
    description: "Transaction 20",
    amount: 2000,
    total: 2000,
    userId: ["user5"],
    origin: {
      id: `O1`,
      name: `Origin 1`,
      icon: `favorite`, // Replace with actual Material icon names as needed
    },
    isWithdrawal: false,
  };
  let found: Transaction | undefined = transactions.find(
    (item) => item.id === id,
  );
  if (found) return Promise.resolve(found);

  return Promise.resolve(transaction);
  // throw new Error("Transaction not found");
};

export const createTransaction: CreateTransaction = (
  transactionCreate: Partial<Transaction>,
) => {
  if (transactionCreate.id) {
    throw Error("transaction already exists");
  }

  transactionCreate.id = new Date().toLocaleString();
  transactions.push(transactionCreate as Transaction);
  return Promise.resolve();
};
