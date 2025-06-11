import * as schema from "@/db/schema";
import { GetOrigins } from "@/domain/repositories/originRepository";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

type OriginRepositoryFactory = (db: SQLiteDatabase) => GetOrigins;
export const getOrigins: OriginRepositoryFactory = (db) => async () => {
  const drizzleDb = drizzle(db, { schema });
  const originsDb = await drizzleDb.query.origins.findMany({
    where: (origins, { ne }) => ne(origins.deleted, 1),
  });

  if (!originsDb || originsDb.length === 0) {
    return [];
  }

  return originsDb.map((originDb) => ({
    id: originDb.id.toString(),
    name: originDb.name,
    icon: originDb.icon,
  }));
};
