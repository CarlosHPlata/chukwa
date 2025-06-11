import { GetConcepts } from "@/domain/repositories/conceptRepository";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import * as schema from "@/db/schema";
import { Builder } from "builder-pattern";
import { Concept } from "@/domain/entities/Concept";

type GetConceptsFactory = (db: SQLiteDatabase) => GetConcepts;
export const getConcepts: GetConceptsFactory = (db) => async () => {
  const drizzleDb = drizzle(db, { schema });
  const conceptsDb = await drizzleDb.query.concepts.findMany({
    where: (concepts, { ne }) => ne(concepts.deleted, 1),
  });

  if (!conceptsDb || conceptsDb.length === 0) {
    return [];
  }

  return conceptsDb.map((conceptDb) =>
    Builder<Concept>({
      id: conceptDb.id.toString(),
      name: conceptDb.name,
      icon: conceptDb.icon,
    }).build(),
  );
};
