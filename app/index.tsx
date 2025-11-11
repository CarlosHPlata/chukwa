import ApiScreen from "@/components/apiScreen";
import Total from "@/components/total";
import TransactionList from "@/components/Transaction/TransactionList";
import useActiveTransactions from "@/hooks/useActiveTransactions";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, useGlobalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const { refresh } = useGlobalSearchParams();
  const { data, isLoading, error } = useActiveTransactions(
    parseInt(refresh as string) ?? 0,
  );

  return (
    <ApiScreen isLoading={isLoading} error={error}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          marginTop: 50,
        }}
      >
        <Total
          total={data?.currentTotal || 0}
          startingTotal={data?.startingTotal || 0}
          currentPeriodId={data?.activeMonthId || 0}
        />
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
