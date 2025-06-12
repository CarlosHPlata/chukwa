import { DrizzleDb } from "@/components/DrizzleProvider";
import { GetConcepts } from "@/domain/repositories/conceptRepository";

type GetConceptsFactory = (drizzleDb: DrizzleDb) => GetConcepts;
export const getConcepts: GetConceptsFactory = (drizzleDb) => async () => {
  const conceptsDb = await drizzleDb.query.concepts.findMany({
    where: (concepts, { ne }) => ne(concepts.deleted, 1),
  });

  if (!conceptsDb || conceptsDb.length === 0) {
    return [];
  }

  return conceptsDb.map((conceptDb) => ({
    id: conceptDb.id.toString(),
    name: conceptDb.name,
    icon: conceptDb.icon,
  }));
};
