import { Transaction } from "@/domain/entities/Transaction";
import useFormattedCurrency from "@/hooks/useFormattedCurrency";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import useFormattedDate from "@/hooks/useFormattedDate";

type Props = {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
};

export default function TransactionItem({ transaction, onPress }: Props) {
  const formattedAmount = useFormattedCurrency(transaction.amount);
  const formattedDate = useFormattedDate(transaction.date, 'datetime');

  return (
    <TouchableHighlight
      key={transaction.id}
      onPress={() => onPress(transaction)}
      style={styles.transactionContainer}
    >
      <View>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {transaction.description}
        </Text>
        <Text style={{ color: transaction.isWithdrawal ? "red" : "green" }}>
          {transaction.isWithdrawal ? "-" : "+"}{formattedAmount}
        </Text>
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
