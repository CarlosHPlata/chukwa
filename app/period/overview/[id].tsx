import ApiScreen from "@/components/apiScreen";
import ThemedButton from "@/components/form/themedButton";
import { usePeriodOverview } from "@/hooks/usePeriodOverview";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import ConceptOverview from "./components/conceptOverview";
import PeriodSummary from "./components/periodSummary";
import SpentSummary from "./components/spentSummary";

export default function PeriodOverview() {
  const { id } = useLocalSearchParams();
  const { isLoading, error, data } = usePeriodOverview(
    id ? parseInt(id as string, 10) : 0,
  );

  const onButtonPress = () => {
    router.push({
      pathname: "/period/overview/new",
      params: { total: data?.endTotal ?? 0 },
    });
  };

  return (
    <ApiScreen isLoading={isLoading} error={error}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          paddingHorizontal: 20,
          paddingTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          {`Let's Wrap everything before going ahead`}
        </Text>
        {data != null && (
          <>
            <PeriodSummary period={data} />
            <SpentSummary period={data} />
            <ConceptOverview period={data} />
          </>
        )}
      </View>
      <View
        style={{
          paddingBottom: 50,
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
      >
        <ThemedButton onPress={onButtonPress} label="Continue" />
      </View>
    </ApiScreen>
  );
}
