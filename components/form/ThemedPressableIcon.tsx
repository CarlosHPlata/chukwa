import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable } from "react-native";

type PressableProps = {
  onPress: () => void;
  icon: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: string;
};

export default function ThemedPressableIcon({
  onPress,
  icon,
  size = 10,
  color = "#25292e",
}: PressableProps) {
  return (
    <Pressable
      testID="themed-pressable-icon:Pressable"
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
    >
      <MaterialIcons name={icon} size={size} color={color} />
    </Pressable>
  );
}
