import { Transaction } from "@/domain/entities/Transaction";
import { getTransactionById } from "@/repositories/sqlite/TransactionRepository";
import { AsyncResponse } from "./AsyncResponse";
import useAsyncValues from "./useAsyncValues";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";

export default function useGetTransactionById(transactionId: string): AsyncResponse<Transaction> {
  const db = useSQLiteContext();

  const callback = useCallback(() => {
    const getTransactionByIdRepo = getTransactionById(db)
    return getTransactionByIdRepo(transactionId);
  }, [db, transactionId]);

  return useAsyncValues(callback)
}
