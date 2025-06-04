import { InputModeOptions, KeyboardType, Text, TextInput } from "react-native";

type Props = {
  label: string;
  value?: string;
  onChangeText?: (current: string) => void;
  inputMode?: InputModeOptions;
  keyboardType?: KeyboardType;
};

export default function ThemedTextInput({
  label,
  inputMode = 'text',
  keyboardType = 'default',
  value = "",
  onChangeText = () => {},
}: Props) {
  return (
    <>
      <Text>{label}</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 16, padding: 8 }}
        keyboardType={keyboardType}
        placeholder={label}
        inputMode={inputMode}
        value={value}
        onChangeText={onChangeText}
      />
    </>
  );
}
