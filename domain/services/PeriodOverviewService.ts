import { ConceptSummary } from "../aggregates/ConceptSummary";
import { PeriodOverviewAggregate } from "../aggregates/PeriodOverview";
import { Transaction } from "../entities/Transaction";
import { GetPeriodById } from "../repositories/activeRepository";
import { GetTransactionsByActiveMonth } from "../repositories/transactionRepository";

export const getPeriodOverviewService =
  (
    getPeriodById: GetPeriodById,
    getTransactionsFromRepo: GetTransactionsByActiveMonth,
  ) =>
  async (periodId: number): Promise<PeriodOverviewAggregate> => {
    const period = await getPeriodById(periodId);
    if (!period) {
      throw new Error(`Period with ID ${periodId} not found`);
    }

    const transactions: Transaction[] = await getTransactionsFromRepo(periodId);
    const { spent, income, endTotal } = calculateTotals(
      period.total,
      transactions,
    );

    return {
      ...period,
      endTotal,
      spent,
      income,
      concepts: calculateConceptsOverview(transactions, spent),
    };
  };

const calculateTotals = (
  startTotal: number,
  transactions: Transaction[],
): { spent: number; income: number; endTotal: number } => {
  let spent = 0;
  let income = 0;
  const endTotal = transactions.reduce((total, transaction) => {
    if (!transaction.isWithdrawal) {
      income += transaction.amount;
      return total + transaction.amount;
    }

    spent += transaction.amount;
    return total - transaction.amount;
  }, startTotal);

  return { spent, income, endTotal };
};

const calculateConceptsOverview = (
  transactions: Transaction[],
  total: number,
): ConceptSummary[] => {
  const conceptsMap: { [key: string]: ConceptSummary } = {};

  transactions.forEach((transaction) => {
    const concept = transaction.concept;
    if (!concept || !concept.id) {
      console.warn("Transaction without a valid concept:", transaction);
      return;
    }

    if (!conceptsMap[concept.id]) {
      conceptsMap[concept.id] = {
        id: concept.id,
        name: concept.name || "Unknown",
        icon: concept.icon || "money",
        amount: 0,
        percentage: 0,
      };
    }

    if (transaction.isWithdrawal) {
      conceptsMap[concept.id].amount += transaction.amount;
    }
  });

  Object.values(conceptsMap).forEach((concept) => {
    concept.percentage = total > 0 ? (concept.amount / total) * 100 : 0;
  });

  return Object.values(conceptsMap)
    .filter((c) => c.amount > 0)
    .sort((a, b) => b.amount - a.amount);
};
