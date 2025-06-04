import { Pressable, Text, View } from "react-native";

type Props = {
  onPress: () => void;
  label: string;
}

export default function ThemedButton({ onPress, label }: Props) {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            alignItems: "center",
            marginHorizontal: 30,
            backgroundColor: pressed ? "#3a3f47" : "#25292e",
            paddingVertical: 10,
            flexGrow: 1,
            borderRadius: 10,
          },
        ]}
      >
        <Text style={{ color: "#fff" }}>{label}</Text>
      </Pressable>
    </View>
  );
}
