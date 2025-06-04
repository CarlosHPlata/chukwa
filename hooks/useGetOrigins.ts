import { Origin } from "@/domain/entities/Origin";
import { getOrigins } from "@/repositories/sqlite/OriginRepository";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { AsyncResponse } from "./AsyncResponse";
import useAsyncValues from "./useAsyncValues";

export default function useGetOrigins(): AsyncResponse<Origin[]> {
  const db = useSQLiteContext();

  const callback = useCallback(() => {
    const getOriginsRepo = getOrigins(db);
    return getOriginsRepo();
  }, [db]);

  return useAsyncValues(callback);
}
