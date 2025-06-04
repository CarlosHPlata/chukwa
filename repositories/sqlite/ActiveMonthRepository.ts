import * as schema from "@/db/schema";
import { SAVE_DATE_FORMAT } from "@/domain/constants";
import { ActiveMonth } from "@/domain/entities/ActiveMonth";
import { GetActiveMonth } from "@/domain/repositories/activeRepository";
import { Builder } from "builder-pattern";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import moment from "moment";

type GetActiveMonthFactory = (db: SQLiteDatabase) => GetActiveMonth;
export const getActiveMonth: GetActiveMonthFactory = (db) => async () => {
  try {
    const drizzleDb = drizzle(db, { schema });
    let result = await drizzleDb.query.activeMonths.findFirst({
      orderBy: (activeMonths, { desc }) => desc(activeMonths.id),
    });

    if (!result) {
      const firstMonth = {
        total: 0,
        startDate: moment(new Date()).format(SAVE_DATE_FORMAT),
      }
      let inserted = await drizzleDb.insert(schema.activeMonths).values(firstMonth).returning();
      return Builder<ActiveMonth>() 
        .id(inserted[0].id)
        .total(firstMonth.total)
        .startDate(firstMonth.startDate)
        .build();
    }

    return Builder<ActiveMonth>()
      .id(result.id)
      .total(result.total)
      .startDate(result.startDate)
      .build();
  } catch (error) {
    console.error("Error fetching active month:", error);
    throw new Error("Failed to fetch active month");
  }
}
