import { PeriodOverviewAggregate } from "@/domain/aggregates/PeriodOverview";
import useFormattedCurrency from "@/hooks/useFormattedCurrency";
import { Text, View } from "react-native";

type Props = {
  period: PeriodOverviewAggregate;
};
export default function SpentSummary({ period }: Props) {
  const formattedSpent = useFormattedCurrency(period.spent || 0);
  const formattedIncome = useFormattedCurrency(period.income || 0);

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        You spent: {formattedSpent}{" "}
      </Text>
      <Text
        style={{
          fontSize: 18,
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        and earned: {formattedIncome}
      </Text>
    </View>
  );
}
