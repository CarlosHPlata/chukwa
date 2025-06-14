import { PresentTransactionAggregate } from "@/domain/aggregates/ActiveTransactionsAggregate";
import { Transaction } from "@/domain/entities/Transaction";
import useFormattedCurrency from "@/hooks/useFormattedCurrency";
import useFormattedDate from "@/hooks/useFormattedDate";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

type Props = {
  transaction: PresentTransactionAggregate;
  onPress: (transaction: Transaction) => void;
};

export default function TransactionItem({ transaction, onPress }: Props) {
  const formattedAmount = useFormattedCurrency(transaction.amount);
  const formattedTotal = useFormattedCurrency(transaction.total);
  const formattedDate = useFormattedDate(transaction.date, 'datetime');

  return (
    <TouchableHighlight
      testID="transaction-item:pressable"
      key={transaction.id}
      onPress={() => onPress(transaction)}
      style={styles.transactionContainer}
    >
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 16, flex: 1, fontWeight: "bold" }}>
            {transaction.description}
          </Text>
          <MaterialIcons name={transaction.concept.icon} size={16} />
          <MaterialIcons name={transaction.origin.icon} size={16} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center"}}>
          <Text style={{ color: transaction.isWithdrawal ? "red" : "green", flex: 1 }}>
            {transaction.isWithdrawal ? "-" : "+"}{formattedAmount}
          </Text>
          <Text style={{ color: "gray", fontSize: 12 }}>
            {formattedTotal}
          </Text>
        </View>
        <Text style={{ color: "gray" }}>
          {formattedDate}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  transactionContainer: {
    backgroundColor: "white",
    padding: 10,
    margin: 5,
    borderRadius: 8,
  },
});
