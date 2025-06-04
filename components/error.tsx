import { Link } from "expo-router";
import { Text, View } from "react-native";

type Props = {
  error: string;
};

export default function Error({ error }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Sorry we had an issue</Text>
      <Text>{error}</Text>
      <Link href="../">Go back</Link>
    </View>
  );
}
