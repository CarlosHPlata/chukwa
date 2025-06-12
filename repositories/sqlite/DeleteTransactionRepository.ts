import { DrizzleDb } from "@/components/DrizzleProvider";
import * as schema from "@/db/schema";
import { DeleteTransaction } from "@/domain/repositories/transactionRepository";
import { eq } from "drizzle-orm";

type DeleteTransactionRepositoryFactory = (
  drizzleDb: DrizzleDb,
) => DeleteTransaction;
export const deleteTransactionRepository: DeleteTransactionRepositoryFactory =
  (drizzleDb) => async (transactionId) => {
    try {
      const transactionIdNumber = parseInt(transactionId, 10);
      if (isNaN(transactionIdNumber)) {
        throw new Error("Invalid transaction ID");
      }
      await drizzleDb
        .update(schema.transactions)
        .set({ deleted: 1 })
        .where(eq(schema.transactions.id, transactionIdNumber));
    } catch (error) {
      console.error("Error deleting transaction:", error);
      const errorMessage: string =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message || "Unknown error"
          : (error as string);
      throw new Error("Failed to delete transaction " + errorMessage);
    }
  };
