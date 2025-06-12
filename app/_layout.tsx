import { DrizzleProvider } from "@/components/DrizzleProvider";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
export const DATABASE_NAME = "chukwadb";

export default function RootLayout() {
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <DrizzleProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="transaction/add"
              options={{ headerTitle: "Add New" }}
            />
            <Stack.Screen
              name="transaction/[id]"
              options={{ headerTitle: "Transaction" }}
            />
          </Stack>
        </DrizzleProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
