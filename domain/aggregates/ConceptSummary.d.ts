import { Concept } from "../entities/Concept";

export type ConceptSummary = Concept & {
  amount: number;
  percentage: number;
};
