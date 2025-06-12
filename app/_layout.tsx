import migrations from "@/drizzle/migrations";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
export const DATABASE_NAME = "chukwadb";

export default function RootLayout() {
  const expoDb = openDatabaseSync(DATABASE_NAME, { useNewConnection: true });
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="transaction/add" options={{ headerTitle: "Add New"}}/>
          <Stack.Screen name="transaction/[id]" options={{ headerTitle: "Transaction"}} />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}
