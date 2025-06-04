import { Concept } from "./Concept";
import { Origin } from "./Origin";

export type Transaction = {
  id: string;
  date: Date;
  concept: Concept;
  description: string;
  amount: number;
  total: number;
  userId: string[];
  origin: Origin;
  isWithdrawal: boolean;
}
