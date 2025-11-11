import { toFixedInt } from "../utils/currency";
import { NotSavedTransaction } from "../entities/Transaction";
import { CreateTransaction } from "../repositories/transactionRepository";

export type CreateTransactionService = (
  transaction: NotSavedTransaction,
  activeMonthId: number,
) => Promise<void>;

export const createTransactionService =
  (createRepo: CreateTransaction): CreateTransactionService =>
    async (transaction: NotSavedTransaction, activeMonthId: number) => {
      if (!transaction.date) {
        transaction.date = new Date();
      }
      transaction.amount = toFixedInt(transaction.amount);
      validateTransaction(transaction);
      return createRepo(transaction, activeMonthId);
    };

const validateTransaction = (transaction: NotSavedTransaction) => {
  if (isNaN(transaction.amount) || transaction.amount <= 0) {
    throw new Error("Amount cannot be negative");
  }
  if (
    !transaction.concept ||
    !transaction.concept.id ||
    transaction.concept.id === ""
  ) {
    throw new Error("Concept must be provided");
  }
  if (
    !transaction.origin ||
    !transaction.origin.id ||
    transaction.origin.id === ""
  ) {
    throw new Error("Origin must be provided");
  }
  if (
    transaction.description.length > 255 ||
    transaction.description.length === 0
  ) {
    throw new Error("Description must be between 1 and 255 characters");
  }
  if (transaction.userId.length === 0) {
    throw new Error("User ID must be provided");
  }
};
