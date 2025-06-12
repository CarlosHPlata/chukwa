import { Origin } from "@/domain/entities/Origin";
import { getOrigins } from "@/repositories/sqlite/OriginRepository";
import { useCallback } from "react";
import { AsyncResponse } from "./AsyncResponse";
import useAsyncValues from "./useAsyncValues";
import { useDatabase } from "./useDatabase";

export default function useGetOrigins(): AsyncResponse<Origin[]> {
  const db = useDatabase();

  const callback = useCallback(() => {
    if (!db) {
      return Promise.reject(new Error("Database not initialized"));
    }

    const getOriginsRepo = getOrigins(db);
    return getOriginsRepo();
  }, [db]);

  return useAsyncValues(callback);
}
