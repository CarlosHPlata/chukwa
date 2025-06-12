import { Transaction } from "@/domain/entities/Transaction";
import { createTransactionService } from "@/domain/services/CreateTransactionService";
import { createTransaction } from "@/repositories/sqlite/TransactionRepository";
import { useCallback, useState } from "react";
import { AsyncAction } from "./AsyncResponse";
import { useDatabase } from "./useDatabase";

export default function useSaveTransaction(): AsyncAction & {
  callback: (
    transaction: Omit<Transaction, "id">,
    activeMonthId: number,
  ) => void;
} {
  const db = useDatabase();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const callback = useCallback(
    (transaction: Omit<Transaction, "id">, activeMonthId: number) => {
      if (!db) {
        console.error("Database not initialized");
        setError("Database not initialized");
        return;
      }

      setError(undefined);
      setIsLoading(true);
      const createRepo = createTransaction(db);
      const service = { create: createTransactionService(createRepo) };

      service
        .create(transaction, activeMonthId)
        .then(() => {
          setIsLoading(false);
        })
        .catch((e) => {
          console.error("Error saving transaction:", e);
          setError(e.message);
          setIsLoading(false);
        });
    },
    [db],
  );

  return { isLoading, error, callback };
}
