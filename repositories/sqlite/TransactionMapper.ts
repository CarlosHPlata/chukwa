import { ConceptDb, OriginDb, TransactionDb } from "@/db/schema";
import { Transaction } from "@/domain/entities/Transaction";

export const mapTransactionDb = (
  transaction: TransactionDb,
  concept: Partial<ConceptDb>,
  origin: Partial<OriginDb>,
): Transaction => {
  return {
    id: transaction.id.toString(),
    date: new Date(transaction.date * 1000),
    concept: {
      id: concept.id?.toString() ?? "",
      name: concept.name ?? "",
      icon: concept.icon ?? "",
    },
    description: transaction.description,
    amount: transaction.amount,
    total: 0,
    userId: ["1"],
    origin: {
      id: origin.id ? origin.id.toString() : "",
      name: origin.name ? origin.name : "",
      icon: origin.icon ? origin.icon : "",
    },
    isWithdrawal: transaction.isWithdrawal === 1,
  };
};
