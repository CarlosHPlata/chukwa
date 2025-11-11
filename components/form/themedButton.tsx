import { PropsWithChildren } from "react";
import { Pressable, Text, View } from "react-native";

type Props = PropsWithChildren<{
  onPress: () => void;
  label?: string;
}>;

export default function ThemedButton({ children, onPress, label }: Props) {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Pressable
        testID="themed-button:Pressable"
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
        <Text testID="themed-button:Label" style={{ color: "#fff" }}>
          {children || label}
        </Text>
      </Pressable>
    </View>
  );
}
