import Checkbox from "expo-checkbox";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export default function ThemedCheckbox({ label, value, onValueChange }: Props) {
  return (
    <View style={styles.container}>
      <Checkbox
        testID="themed-checkbox:Checkbox"
        style={styles.checkbox}
        value={value}
        onValueChange={onValueChange}
      />
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 30,
    alignItems: "center",
  },

  checkbox: {
    margin: 8,
  },
});
