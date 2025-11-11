import { ConceptSummary } from "@/domain/aggregates/ConceptSummary";
import { Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useFormattedCurrency from "@/hooks/useFormattedCurrency";

type PeriodItemProps = {
  item: ConceptSummary
};

export default function ConceptOverviewItem({ item }: PeriodItemProps) {
  const formattedAmount = useFormattedCurrency(item.amount);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      }}
    >
      <View style={{ flex: 1, borderBottomWidth: 1, borderColor: "#ccc" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name={item.icon}
              size={20}
              style={{
                color: "#4caf50",
                marginRight: 8,
                marginLeft: 4,
              }}
            />
            <Text>{item.name}</Text>
          </View>
          <Text>{formattedAmount}</Text>
        </View>
        <View
          style={{
            height: 8,
            backgroundColor: "#eee",
            borderRadius: 4,
            marginTop: 8,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: `${item.percentage}%`,
              height: "100%",
              backgroundColor: "#4caf50",
              borderRadius: 4,
            }}
          />
        </View>
      </View>
    </View>
  );

}
