import ApiScreen from "@/components/apiScreen";
import ThemedButton from "@/components/form/themedButton";
import ThemedTextInput from "@/components/form/themedTextInput";
import { ActiveMonth } from "@/domain/entities/ActiveMonth";
import { toCurrency, toFixedInt } from "@/domain/utils/currency";
import { todayDateString } from "@/domain/utils/date";
import useAddNewPeriod from "@/hooks/useAddNewPeriod";
import { router, useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function NewPeriod() {
  const { total = 0 } = useGlobalSearchParams();
  const [amountText, setAmountText] = useState<string>("0");
  const [amount, setAmount] = useState<number>(0);
  const { isLoading, error, callback: addNewPeriod } = useAddNewPeriod();

  useEffect(() => {
    if (total) {
      const parsedTotal = parseFloat(total as string);
      setAmount(parsedTotal);
      setAmountText(toCurrency(parsedTotal));
    }
  }, [total]);

  const onChangeAmount = (text: string) => {
    if (text === "") {
      setAmount(0);
      return;
    }
    const parsedAmount = parseFloat(text);
    const isValid = !isNaN(parsedAmount) && isFinite(parsedAmount);

    if (!isValid || parsedAmount < 0) {
      setAmount(0);
      return;
    }

    setAmount(parsedAmount);
  };

  const onSubmit = () => {
    const newPeriod: Omit<ActiveMonth, "id"> = {
      total: toFixedInt(amount),
      startDate: todayDateString(),
    };

    addNewPeriod(newPeriod).then(() => {
      router.setParams({ refresh: Date.now() });
      router.dismissAll();
    });
  };

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
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Let&apos;s start a new period!
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 20 }}>
          Tell us how much you want to start with in this new period.
        </Text>
        <ThemedTextInput
          label="Amount"
          inputMode="numeric"
          keyboardType="decimal-pad"
          value={amountText}
          onChangeText={(text) => {
            setAmountText(text);
            onChangeAmount(text);
          }}
        />
      </View>
      <View
        style={{
          marginBottom: 100,
        }}
      >
        <ThemedButton onPress={onSubmit} label="Start new Period" />
      </View>
    </ApiScreen>
  );
}
