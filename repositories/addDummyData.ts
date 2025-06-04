import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import AsyncStorage from "expo-sqlite/kv-store";

export const addDummyData = async (db: ExpoSQLiteDatabase) => {
  try {
    const isInitialized = AsyncStorage.getItemSync("dbInitialized");
    if (isInitialized) {
      console.log(
        "Database already initialized, skipping dummy data insertion.",
      );
      return;
    }
  } catch (error) {
    console.error("Error inserting dummy data:", error);
  }
};
