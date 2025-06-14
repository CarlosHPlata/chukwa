import ApiScreen from "@/components/apiScreen";
import EditTransaction from "@/components/Transaction/EditTransaction";
import { NotSavedTransaction } from "@/domain/entities/Transaction";
import useGetConcepts from "@/hooks/useGetConcepts";
import useGetOrigins from "@/hooks/useGetOrigins";
import useSaveTransaction from "@/hooks/useSaveTransaction";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo } from "react";

export default function Add() {
  const { activeMonthId = 0 } = useLocalSearchParams();
  const {
    data: concepts,
    isLoading: isConceptsLoading,
    error: conceptError,
  } = useGetConcepts();
  const {
    data: origins,
    isLoading: isOriginsLoading,
    error: originError,
  } = useGetOrigins();

  const { callback: saveTransaction, isLoading: isSaveLoading } =
    useSaveTransaction();

  const isLoading = useMemo(
    () => isConceptsLoading || isOriginsLoading,
    [isConceptsLoading, isOriginsLoading],
  );

  const error = useMemo(() => {
    if (conceptError) return conceptError;
    if (originError) return originError;
  }, [conceptError, originError]);

  const handleSave = useCallback((transaction: NotSavedTransaction) => {
    saveTransaction(transaction, activeMonthId as number);
    router.setParams({ refresh: Date.now() });
    router.back();
  }, [saveTransaction, activeMonthId]);

  return (
    <ApiScreen isLoading={isLoading} error={error}>
      <EditTransaction concepts={concepts} origins={origins} onSave={handleSave}/>
    </ApiScreen>
  );
}
