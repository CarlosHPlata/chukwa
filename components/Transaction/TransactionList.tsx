import { Transaction } from "@/domain/entities/Transaction";
import { router } from "expo-router";
import { FlatList } from "react-native";
import TransactionItem from "./TransactionItem";

type Props = {
  transactions: Transaction[];
};
export default function TransactionList({ transactions }: Props) {
  const onItemPressed = (transaction: Transaction) => {
    router.push(`/transaction/${transaction.id}`);
  };

  return (
    <FlatList
      data={transactions}
      style={{ width: "100%", flexGrow: 1, backgroundColor: "lightgray" }}
      renderItem={({ item }) => (
        <TransactionItem transaction={item} onPress={onItemPressed} />
      )}
    />
  );
}
