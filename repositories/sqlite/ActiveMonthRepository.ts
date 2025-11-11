import { DrizzleDb } from "@/components/DrizzleProvider";
import * as schema from "@/db/schema";
import { ActiveMonth } from "@/domain/entities/ActiveMonth";
import {
  AddNewPeriod,
  GetActiveMonth,
  GetPeriodById,
} from "@/domain/repositories/activeRepository";
import { todayDateString } from "@/domain/utils/date";

type GetActiveMonthFactory = (drizzleDb: DrizzleDb) => GetActiveMonth;
export const getActiveMonth: GetActiveMonthFactory =
  (drizzleDb) => async () => {
    try {
      let result = await drizzleDb.query.activeMonths.findFirst({
        orderBy: (activeMonths, { desc }) => desc(activeMonths.id),
      });

      if (!result) {
        const firstMonth = {
          total: 0,
          startDate: todayDateString(),
        };

        return addNewPeriod(drizzleDb)(firstMonth);
      }

      return parseActiveMonth(result);
    } catch (error) {
      console.error("Error fetching active month:", error);
      const errorMessage: string =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message || "Unknown error"
          : (error as string);
      throw new Error("Failed to fetch active month " + errorMessage);
    }
  };

export const addNewPeriod =
  (drizzleDb: DrizzleDb): AddNewPeriod =>
  async (period: Omit<ActiveMonth, "id">) => {
    let inserted = await drizzleDb
      .insert(schema.activeMonths)
      .values(period)
      .returning();

    if (inserted.length === 0) {
      throw new Error("Failed to insert new period");
    }

    return {
      id: inserted[0].id,
      total: period.total,
      startDate: period.startDate,
    };
  };

export const getPeriodById =
  (drizzleDb: DrizzleDb): GetPeriodById =>
  async (periodId: number) => {
    try {
      let result = await drizzleDb.query.activeMonths.findFirst({
        where: (activeMonths, { eq }) => eq(activeMonths.id, periodId),
      });

      if (!result) {
        throw new Error(`Period with ID ${periodId} not found`);
      }

      return parseActiveMonth(result);
    } catch (error) {
      console.error("Error fetching period by ID:", error);
      const errorMessage: string =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message || "Unknown error"
          : (error as string);
      throw new Error("Failed to fetch period by ID " + errorMessage);
    }
  };

const parseActiveMonth = (activeMonth: schema.ActiveMonthDb): ActiveMonth => {
  return {
    id: activeMonth.id,
    total: activeMonth.total,
    startDate: activeMonth.startDate,
  };
};
