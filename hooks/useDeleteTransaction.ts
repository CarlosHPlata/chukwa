import { deleteTransactionRepository } from "@/repositories/sqlite/DeleteTransactionRepository";
import { useCallback, useState } from "react";
import { AsyncAction } from "./AsyncResponse";
import { useDatabase } from "./useDatabase";

export default function useDeleteTransaction(): AsyncAction & {
  callback: (transactionId: string) => void;
} {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const db = useDatabase();

  const callback = useCallback(
    (transactionId: string) => {
      if (!db) {
        return Promise.reject(new Error("Database not initialized"));
      }

      const deleteTransaction = deleteTransactionRepository(db);
      setIsLoading(true);
      deleteTransaction(transactionId)
        .then(() => {
          setIsLoading(false);
        })
        .catch((e) => {
          console.error("Error deleting transaction:", e);
          setError(e.message);
          setIsLoading(false);
        });
    },
    [db],
  );

  return {
    isLoading,
    error,
    callback,
  };
}
