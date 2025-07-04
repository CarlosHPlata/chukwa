import { DrizzleDb } from "@/components/DrizzleProvider";
import * as schema from "@/db/schema";
import { SAVE_DATE_FORMAT } from "@/domain/constants";
import { GetActiveMonth } from "@/domain/repositories/activeRepository";
import { DateTime } from "luxon";

type GetActiveMonthFactory = (drizzleDb: DrizzleDb) => GetActiveMonth;
export const getActiveMonth: GetActiveMonthFactory = (drizzleDb) => async () => {
  try {
    let result = await drizzleDb.query.activeMonths.findFirst({
      orderBy: (activeMonths, { desc }) => desc(activeMonths.id),
    });

    if (!result) {
      const firstMonth = {
        total: 0,
        startDate: DateTime.fromJSDate(new Date()).toFormat(SAVE_DATE_FORMAT),
      };
      let inserted = await drizzleDb
        .insert(schema.activeMonths)
        .values(firstMonth)
        .returning();

      return {
        id: inserted[0].id,
        total: firstMonth.total,
        startDate: firstMonth.startDate,
      };
    }

    return {
      id: result.id,
      total: result.total,
      startDate: result.startDate,
    };
  } catch (error) {
    console.error("Error fetching active month:", error);
    const errorMessage: string =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message || "Unknown error"
        : (error as string);
    throw new Error("Failed to fetch active month " + errorMessage);
  }
};
