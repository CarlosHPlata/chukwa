import { Concept } from "@/domain/entities/Concept";
import { Origin } from "@/domain/entities/Origin";
import { NotSavedTransaction } from "@/domain/entities/Transaction";
import { useEffect, useReducer, useState } from "react";
import { View } from "react-native";
import ThemedButton from "../form/themedButton";
import ThemedCheckbox from "../form/themedCheckbox";
import ThemedDateTimePicker from "../form/themedDateTimePicker";
import ThemedPicker from "../form/themedPicker";
import ThemedTextInput from "../form/themedTextInput";
import { transactionReducer } from "../util/transactionReducer";

const defaultTransaction: NotSavedTransaction = {
  amount: 0,
  description: "",
  concept: { id: "", name: "", icon: "" },
  origin: { id: "", name: "", icon: "" },
  date: new Date(),
  isWithdrawal: true,
  userId: ["1"],
};

type Props = {
  initialValue?: NotSavedTransaction;
  concepts?: Concept[];
  origins?: Origin[];
  onSave?: (transaction: NotSavedTransaction) => void;
};

export default function EditTransaction({
  initialValue = { ...defaultTransaction, date: new Date() },
  concepts,
  origins,
  onSave = () => {},
}: Props) {
  const [amountText, setAmountText] = useState("");
  const [state, dispatch] = useReducer(transactionReducer, initialValue);

  useEffect(() => {
    if (concepts && concepts.length > 0) {
      dispatch({ type: "SET_CONCEPT", payload: concepts[0] });
    }
    if (origins && origins.length > 0) {
      dispatch({ type: "SET_ORIGIN", payload: origins[0] });
    }
  }, [concepts, origins]);

  return (
    <>
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
        <ThemedButton onPress={() => onSave(state)} label="Save new" />
      </View>
    </>
  );
}
