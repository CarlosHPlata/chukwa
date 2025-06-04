import { Concept } from "@/domain/entities/Concept";
import { getConcepts } from "@/repositories/sqlite/ConceptRepository";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { AsyncResponse } from "./AsyncResponse";
import useAsyncValues from "./useAsyncValues";

export default function useGetConcepts(): AsyncResponse<Concept[]> {
  const db = useSQLiteContext();
  
  const callback = useCallback(() => {
    const getConceptsRepo = getConcepts(db);
    return getConceptsRepo();
  }, [db]);

  return useAsyncValues(callback);
}
