import { Transaction } from "../entities/Transaction";

export type GetTransactionsRepo = () => Promise<Transaction[]>;

export type GetTransactionsByActiveMonth = (
  activeMonthId: id,
) => Promise<Transaction[]>;

export type GetTransactionByIdFromRepo = (id: string) => Promise<Transaction>;

export type CreateTransaction = (
  transaction: Omit<Transaction, "id">,
  activeMonthId: number,
) => Promise<void>;

export type DeleteTransaction = (id: string) => Promise<void>;
