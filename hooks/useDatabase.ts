import type { DrizzleDb } from "@/components/DrizzleProvider";
import { DrizzleContext } from "@/components/DrizzleProvider";
import { useContext } from "react";

export const useDatabase = (): DrizzleDb | null => {
  const db = useContext(DrizzleContext);
  return db;
};
