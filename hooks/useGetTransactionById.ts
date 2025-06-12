import { Transaction } from "@/domain/entities/Transaction";
import { getTransactionById } from "@/repositories/sqlite/TransactionRepository";
import { useCallback } from "react";
import { AsyncResponse } from "./AsyncResponse";
import useAsyncValues from "./useAsyncValues";
import { useDatabase } from "./useDatabase";

export default function useGetTransactionById(transactionId: string): AsyncResponse<Transaction> {
  const db = useDatabase();

  const callback = useCallback(() => {
  if (!db) {
      return Promise.reject(new Error("Database not initialized"));
    }

    const getTransactionByIdRepo = getTransactionById(db)
    return getTransactionByIdRepo(transactionId);
  }, [db, transactionId]);

  return useAsyncValues(callback)
}
