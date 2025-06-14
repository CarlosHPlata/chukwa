import { PropsWithChildren } from "react";
import { ActivityIndicator, View } from "react-native";
import Error from "./error";

type Props = PropsWithChildren<{
  isLoading: boolean;
  error: string | Error | undefined;
}>;

export default function ApiScreen({ isLoading, error, children }: Props) {
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator testID="api-screen:activity-indicator" />
      </View>
    );
  }

  if (error) {
    console.error("Error in ApiScreen:", error);
    return <Error error={error} />;
  }

  return children;
}
