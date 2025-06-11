import ApiScreen from "@/components/apiScreen";
import useFormattedCurrency from "@/hooks/useFormattedCurrency";
import useGetTransactionById from "@/hooks/useGetTransactionById";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function TransactionView() {
  const { id } = useLocalSearchParams();
  const {
    data: transaction,
    isLoading,
    error,
  } = useGetTransactionById(id as string);

  const formattedAmount = useFormattedCurrency(transaction?.amount ?? 0);

  return (
    <ApiScreen isLoading={isLoading} error={error}>
      <View
        style={{
          padding: 24,
          backgroundColor: "#fff",
          borderRadius: 12,
          marginHorizontal: 16,
          elevation: 2,
          marginTop: 50,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
          {transaction?.description}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: transaction?.isWithdrawal ? "#e53935" : "#43a047",
            marginBottom: 8,
            fontWeight: "bold",
          }}
        >
          Amount: {formattedAmount}
        </Text>
        <Text style={{ fontSize: 16, color: "#666", marginBottom: 4 }}>
          Origin:{" "}
          <Text style={{ color: "#222" }}>{transaction?.origin.name}</Text>
        </Text>
        <Text style={{ fontSize: 16, color: "#666" }}>
          Concept:{" "}
          <Text style={{ color: "#222" }}>{transaction?.concept.name}</Text>
        </Text>
      </View>
    </ApiScreen>
  );
}
