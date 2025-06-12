import { DrizzleDb } from "@/components/DrizzleProvider";
import { GetOrigins } from "@/domain/repositories/originRepository";

type OriginRepositoryFactory = (drizzleDb: DrizzleDb) => GetOrigins;
export const getOrigins: OriginRepositoryFactory = (drizzleDb) => async () => {
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
