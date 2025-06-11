import { Link } from "expo-router";
import { Text, View } from "react-native";

type Props = {
  error: Error | string;
};

export default function Error({ error }: Props) {
  console.log("Error:", typeof error, error);
  const errorMessage: string =
    typeof error === "object" && error !== null && "message" in error
      ? (error as { message?: string }).message || "Unknown error"
      : (error as string);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Sorry we had an issue</Text>
      <Text>{errorMessage}</Text>
      <Link href="../">Go back</Link>
    </View>
  );
}
