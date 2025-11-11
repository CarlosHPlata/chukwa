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
            <Stack.Screen
              name="period/overview/[id]"
              options={{ headerTitle: "Period Overview" }}
            />
            <Stack.Screen
              name="period/overview/new"
              options={{ headerTitle: "Let's start again" }}
            />
          </Stack>
        </DrizzleProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
