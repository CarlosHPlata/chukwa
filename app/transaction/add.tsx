import ApiScreen from "@/components/apiScreen";
import ThemedCheckbox from "@/components/ThemeCheckbox";
import ThemedButton from "@/components/themedButton";
import ThemedDateTimePicker from "@/components/themedDateTimePicker";
import ThemedPicker from "@/components/themedPicker";
import ThemedTextInput from "@/components/themedTextInput";
import { Concept } from "@/domain/entities/Concept";
import { Origin } from "@/domain/entities/Origin";
import { Transaction } from "@/domain/entities/Transaction";
import useGetConcepts from "@/hooks/useGetConcepts";
import useGetOrigins from "@/hooks/useGetOrigins";
import useSaveTransaction from "@/hooks/useSaveTransaction";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { View } from "react-native";

const reducer = (
  state: Omit<Transaction, "id" | "total" | "userId">,
  action: { type: string; payload: unknown },
): Omit<Transaction, "id" | "total" | "userId"> => {
  switch (action.type) {
    case "SET_AMOUNT":
      let amount = parseFloat(action.payload as string);
      if (isNaN(amount)) {
        return { ...state, amount: 0 };
      }
      return { ...state, amount };

    case "SET_DESCRIPTION":
      return { ...state, description: action.payload as string };

    case "SET_CONCEPT":
      if (!action.payload || typeof action.payload !== "object") {
        return state;
      }
      return { ...state, concept: action.payload as Concept };

    case "SET_ORIGIN":
      if (!action.payload || typeof action.payload !== "object") {
        return state;
      }
      return { ...state, origin: action.payload as Origin };

    case "SET_DATE":
      return { ...state, date: action.payload as Date };

    case "SET_IS_WITHDRAWAL":
      return { ...state, isWithdrawal: action.payload as boolean };

    default:
      return state;
  }
};

export default function Add() {
  const [amountText, setAmountText] = useState("");
  const [state, dispatch] = useReducer(reducer, {
    amount: 0,
    description: "",
    concept: { id: "", name: "", icon: "" },
    origin: { id: "", name: "", icon: "" },
    date: new Date(),
    isWithdrawal: true,
  });

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

  useEffect(() => {
    if (concepts && concepts.length > 0) {
      dispatch({ type: "SET_CONCEPT", payload: concepts[0] });
    }
    if (origins && origins.length > 0) {
      dispatch({ type: "SET_ORIGIN", payload: origins[0] });
    }
  }, [concepts, origins]);

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

  const onSave = useCallback(() => {
    const transaction: Omit<Transaction, "id"> = {
      ...state,
      total: 0,
      userId: ["1"],
    };

    saveTransaction(transaction, activeMonthId as number);
    router.setParams({ refresh: Date.now() });
    router.back();
  }, [saveTransaction, state, activeMonthId]);

  return (
    <ApiScreen isLoading={isLoading} error={error}>
      <View
        style={{
          flexDirection: "column",
          paddingHorizontal: 40,
          paddingTop: 30,
          paddingBottom: 20,
          flex: 1,
        }}
      >
        <ThemedTextInput
          label="Amount"
          inputMode="numeric"
          keyboardType="decimal-pad"
          value={amountText}
          onChangeText={(text) => {
            setAmountText(text);
            dispatch({ type: "SET_AMOUNT", payload: text });
          }}
        />
        <ThemedTextInput
          label="Description"
          inputMode="text"
          value={state.description}
          onChangeText={(text) =>
            dispatch({ type: "SET_DESCRIPTION", payload: text })
          }
        />
        <ThemedPicker
          label="Concept"
          values={(concepts ?? []).map((concept) => ({
            value: concept.id,
            label: concept.name,
          }))}
          value={state.concept.id}
          onValueChange={(value) =>
            dispatch({
              type: "SET_CONCEPT",
              payload: concepts?.find((c) => c.id === value),
            })
          }
        />
        <ThemedPicker
          label="Origin"
          values={(origins ?? []).map((origins) => ({
            value: origins.id,
            label: origins.name,
          }))}
          value={state.origin.id}
          onValueChange={(value) =>
            dispatch({
              type: "SET_ORIGIN",
              payload: origins?.find((o) => o.id === value),
            })
          }
        />
        <ThemedDateTimePicker
          label="Date"
          value={state.date}
          onDateChanged={(date) =>
            dispatch({ type: "SET_DATE", payload: date })
          }
          mode="date"
        />
        <ThemedCheckbox
          label="Withdrawal"
          value={state.isWithdrawal}
          onValueChange={(value) =>
            dispatch({ type: "SET_IS_WITHDRAWAL", payload: value })
          }
        />
      </View>
      <View
        style={{
          marginBottom: 100,
        }}
      >
        <ThemedButton onPress={onSave} label="Save new" />
      </View>
    </ApiScreen>
  );
}
