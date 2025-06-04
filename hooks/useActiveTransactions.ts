import { ActiveTransactionsAggregate } from "@/domain/aggregates/ActiveTransactionsAggregate";
import { getActiveTransactions } from "@/domain/services/TransactionService";
import { getActiveMonth } from "@/repositories/sqlite/ActiveMonthRepository";
import { getTransactionsByActiveMonth } from "@/repositories/sqlite/TransactionRepository";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { AsyncResponse } from "./AsyncResponse";
import useAsyncValues from "./useAsyncValues";

export default function useActiveTransactions(retry: number): AsyncResponse<ActiveTransactionsAggregate> {
  const db: SQLiteDatabase = useSQLiteContext();

  const getTransactionsFromRepo = useCallback(() => {
    const getTransactionsFromRepo = getTransactionsByActiveMonth(db);
    const getActiveMonthRepo = getActiveMonth(db);
    const getTransactionsService = getActiveTransactions(
      getTransactionsFromRepo,
      getActiveMonthRepo
    );
    return getTransactionsService();
  }, [db, retry]);

  return useAsyncValues<ActiveTransactionsAggregate>(getTransactionsFromRepo);
}
