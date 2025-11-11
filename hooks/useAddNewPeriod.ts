import { DrizzleDb } from "@/components/DrizzleProvider";
import { useDatabase } from "./useDatabase";
import { AsyncAction } from "@/hooks/AsyncResponse";
import { useCallback, useState } from "react";
import { ActiveMonth } from "@/domain/entities/ActiveMonth";
import { addNewPeriod } from "@/repositories/sqlite/ActiveMonthRepository";

export default function useAddNewPeriod(): AsyncAction & {
  callback: (period: Omit<ActiveMonth, "id">) => Promise<ActiveMonth | undefined>;
} {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const db: DrizzleDb | null = useDatabase();

  const callback = useCallback(
    async (period: Omit<ActiveMonth, "id">): Promise<ActiveMonth | undefined> => {
      if (!db) {
        console.error("Database not initialized");
        setError("Database not initialized");
        return;
      }

      setError(undefined);
      setIsLoading(true);
      const addnewPeriodRepo = addNewPeriod(db);

      return addnewPeriodRepo(period)
        .then((addedPeriod) => {
          setIsLoading(false);
          return addedPeriod;
        })
        .catch((e) => {
          console.error("Error adding new period:", e);
          setError(e.message);
          setIsLoading(false);
          return undefined;
        });
    },
    [db],
  );

  return { isLoading, error, callback };
}
