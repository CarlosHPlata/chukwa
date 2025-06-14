import { Picker } from "@react-native-picker/picker";
import { Text } from "react-native";

type Props = {
  label: string;
  values: {
    value: string,
    label: string,
  }[];
  value?: string;
  onValueChange?: (current: string) => void;
};

export default function ThemedPicker({
  label,
  values,
  value = "",
  onValueChange = () => {},
}: Props) {
  return (
    <>
      <Text>{label}</Text>

        <Picker
          testID="themed-picker:Picker"
          selectedValue={value}
          onValueChange={onValueChange}
          style={{ marginBottom: 16 }}
        >
          {values.map((value) => (
            <Picker.Item
              key={value.value}
              label={value.label}
              value={value.value}
            />
          ))}
        </Picker>
    </>
  );
}
