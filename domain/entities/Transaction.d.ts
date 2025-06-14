import { Concept } from "./Concept";
import { Origin } from "./Origin";

type ID = string;
export type BaseTransaction = {
  id: ID;
  date: Date;
  description: string;
  amount: number;
  isWithdrawal: boolean;
}

export type Transaction = BaseTransaction & {
  concept: Partial<Concept>;
  origin: Partial<Origin>;
  userId: string[];
};

export type NotSavedTransaction = Omit<Transaction, "id"> & { id?: ID };
