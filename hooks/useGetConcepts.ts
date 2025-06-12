import { Concept } from "@/domain/entities/Concept";
import { getConcepts } from "@/repositories/sqlite/ConceptRepository";
import { useCallback } from "react";
import { AsyncResponse } from "./AsyncResponse";
import useAsyncValues from "./useAsyncValues";
import { useDatabase } from "./useDatabase";

export default function useGetConcepts(): AsyncResponse<Concept[]> {
  const db = useDatabase();
  
  const callback = useCallback(() => {
    if (!db) {
      return Promise.reject(new Error("Database is not initialized"));
    }

    const getConceptsRepo = getConcepts(db);
    return getConceptsRepo();
  }, [db]);

  return useAsyncValues(callback);
}
