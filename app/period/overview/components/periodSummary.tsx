import { PeriodOverviewAggregate } from "@/domain/aggregates/PeriodOverview";
import useFormattedCurrency from "@/hooks/useFormattedCurrency";
import { Text, View } from "react-native";

type Props = {
  period: PeriodOverviewAggregate
}
export default function PeriodSummary({ period }: Props) {
  const formattedStartingTotal = useFormattedCurrency(period.total || 0);
  const formattedCurrentTotal = useFormattedCurrency(period.endTotal || 0);
  return (
        <View
          style={{
            padding: 10,
            backgroundColor: "#f9f9f9",
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            You started with: {formattedStartingTotal}
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            And ended with: {formattedCurrentTotal}
          </Text>
        </View>
  )
}
