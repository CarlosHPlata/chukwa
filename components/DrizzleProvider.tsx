import * as schema from "@/db/schema";
import migrations from "@/drizzle/migrations";
import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, PropsWithChildren, useEffect } from "react";
import ApiScreen from "./apiScreen";

export type DrizzleDb = ExpoSQLiteDatabase<typeof schema>;
export const DrizzleContext = createContext<DrizzleDb | null>(null);

export const DrizzleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const { success, error } = useMigrations(drizzleDb, migrations);

  useEffect(() => {
    if (error) {
      console.error("Migration error:", error);
    }
  }, [error, success]);

  return (
    <ApiScreen isLoading={!success && !error} error={error}>
      <DrizzleContext.Provider value={drizzleDb}>
        {children}
      </DrizzleContext.Provider>
    </ApiScreen>
  );
};
