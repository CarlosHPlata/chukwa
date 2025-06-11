import { deleteTransactionRepository } from "@/repositories/sqlite/DeleteTransactionRepository";
import { useSQLiteContext } from "expo-sqlite";
import { AsyncAction } from "./AsyncResponse";
import { useCallback, useState } from "react";

export default function useDeleteTransaction(): AsyncAction & {
  callback: (transactionId: string) => void;
} {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const db = useSQLiteContext();

  const callback = useCallback(
    (transactionId: string) => {
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
    callback
  };
}
