import ApiScreen from "@/components/apiScreen";
import TransactionList from "@/components/Transaction/TransactionList";
import useActiveTransactions from "@/hooks/useActiveTransactions";
import useFormattedCurrency from "@/hooks/useFormattedCurrency";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, useGlobalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const { refresh } = useGlobalSearchParams();
  const { data, isLoading, error } = useActiveTransactions(
    parseInt(refresh as string) ?? 0,
  );
  const formattedStartingTotal = useFormattedCurrency(data?.startingTotal || 0);
  const formattedCurrentTotal = useFormattedCurrency(data?.currentTotal || 0);

  return (
    <ApiScreen isLoading={isLoading} error={error}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 10, color: "grey" }}>
            {formattedStartingTotal}
          </Text>
          <Text
            style={{
              fontSize: 50,
              marginTop: -10,
              paddingTop: 0,
              color: "green",
            }}
          >
            {formattedCurrentTotal}
          </Text>
        </View>
        <TransactionList transactions={data?.transactions || []} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 50,
            paddingHorizontal: 10,
            paddingTop: 10,
            marginTop: 10,
          }}
        >
          <Link
            href={{
              pathname: "/transaction/add",
              params: { activeMonthId: data?.activeMonthId },
            }}
            style={[
              {
                backgroundColor: "#25292e",
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 15,
              },
            ]}
          >
            <MaterialIcons name="add" size={38} color="#fff" />
          </Link>
        </View>
      </View>
    </ApiScreen>
  );
}
