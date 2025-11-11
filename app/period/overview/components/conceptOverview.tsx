import { FlatList, Text, View } from "react-native";
import ConceptOverviewItem from "./conceptOverviewItem";
import { PeriodOverviewAggregate } from "@/domain/aggregates/PeriodOverview";

type Props = {
  period: PeriodOverviewAggregate;
};

export default function ConceptOverview({ period }: Props) {
  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        Where your money went:
      </Text>
      <FlatList
        style={{ width: "100%", marginTop: 10, flex: 1 }}
        data={period.concepts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ConceptOverviewItem item={item} />}
      />
    </View>
  );
}
