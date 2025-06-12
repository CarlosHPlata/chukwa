import { DrizzleDb } from "@/components/DrizzleProvider";
import { ActiveTransactionsAggregate } from "@/domain/aggregates/ActiveTransactionsAggregate";
import { getActiveTransactions } from "@/domain/services/TransactionService";
import { getActiveMonth } from "@/repositories/sqlite/ActiveMonthRepository";
import { getTransactionsByActiveMonth } from "@/repositories/sqlite/TransactionRepository";
import { useCallback } from "react";
import { AsyncResponse } from "./AsyncResponse";
import useAsyncValues from "./useAsyncValues";
import { useDatabase } from "./useDatabase";

export default function useActiveTransactions(
  retry: number,
): AsyncResponse<ActiveTransactionsAggregate> {
  const db: DrizzleDb | null = useDatabase();

  const getTransactionsFromRepo = useCallback(() => {
    if (db === null) {
      return Promise.reject(new Error("Database not initialized"));
    }

    const getTransactionsFromRepo = getTransactionsByActiveMonth(db);
    const getActiveMonthRepo = getActiveMonth(db);
    const getTransactionsService = getActiveTransactions(
      getTransactionsFromRepo,
      getActiveMonthRepo,
    );
    return getTransactionsService();
  }, [db, retry]);

  return useAsyncValues<ActiveTransactionsAggregate>(getTransactionsFromRepo);
}
