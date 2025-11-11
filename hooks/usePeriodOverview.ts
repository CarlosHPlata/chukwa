import { DrizzleDb } from "@/components/DrizzleProvider";
import { PeriodOverviewAggregate } from "@/domain/aggregates/PeriodOverview";
import { getPeriodOverviewService } from "@/domain/services/PeriodOverviewService";
import { getPeriodById } from "@/repositories/sqlite/ActiveMonthRepository";
import { getTransactionsByActiveMonth } from "@/repositories/sqlite/TransactionRepository";
import { useCallback } from "react";
import { AsyncResponse } from "./AsyncResponse";
import useAsyncValues from "./useAsyncValues";
import { useDatabase } from "./useDatabase";

export const usePeriodOverview = (
  periodId: number,
): AsyncResponse<PeriodOverviewAggregate> => {
  const db: DrizzleDb | null = useDatabase();

  const getPeriodOverview = useCallback(() => {
    if (db === null) {
      return Promise.reject(new Error("Database not initialized"));
    }

    const transactionRepo = getTransactionsByActiveMonth(db);
    const periodRepo = getPeriodById(db);
    const overviewService = getPeriodOverviewService(
      periodRepo,
      transactionRepo,
    );
    return overviewService(periodId);
  }, [db, periodId]);

  return useAsyncValues(getPeriodOverview);
};
