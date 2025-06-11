import { DeleteTransaction } from "@/domain/repositories/transactionRepository";
import { SQLiteDatabase } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

type DeleteTransactionRepositoryFactory = (
  db: SQLiteDatabase,
) => DeleteTransaction;
export const deleteTransactionRepository: DeleteTransactionRepositoryFactory =
  (db) => async (transactionId) => {
    try {
      const transactionIdNumber = parseInt(transactionId, 10);
      if (isNaN(transactionIdNumber)) {
        throw new Error("Invalid transaction ID");
      }
      const drizzleDb = drizzle(db, { schema });
      await drizzleDb
        .update(schema.transactions)
        .set({ deleted: 1 })
        .where(eq(schema.transactions.id, transactionIdNumber));
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw new Error("Failed to delete transaction");
    }
  };
