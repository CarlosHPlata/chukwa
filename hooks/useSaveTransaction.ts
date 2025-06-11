import { Transaction } from "@/domain/entities/Transaction";
import { createTransaction } from "@/repositories/sqlite/TransactionRepository";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { AsyncAction } from "./AsyncResponse";
import { createTransactionService } from "@/domain/services/CreateTransactionService";

export default function useSaveTransaction(): AsyncAction & {
  callback: (
    transaction: Omit<Transaction, "id">,
    activeMonthId: number,
  ) => void;
} {
  const db = useSQLiteContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const callback = useCallback(
    (transaction: Omit<Transaction, "id">, activeMonthId: number) => {
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
