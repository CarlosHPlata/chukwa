import { ActiveTransactionsAggregate } from "../aggregates/ActiveTransactionsAggregate";
import { ActiveMonth } from "../entities/ActiveMonth";
import { Transaction } from "../entities/Transaction";
import { GetActiveMonth } from "../repositories/activeRepository";
import { GetTransactionsByActiveMonth } from "../repositories/transactionRepository";

export const getActiveTransactions =
  (
    getTransactionsFromRepo: GetTransactionsByActiveMonth,
    getActiveMonth: GetActiveMonth,
  ) =>
  async (): Promise<ActiveTransactionsAggregate> => {
    try {
      const activeMonth: ActiveMonth = await getActiveMonth();
      if (!activeMonth) {
        return {
          transactions: [],
          currentTotal: 0,
          startingTotal: 0,
          activeMonthId: 0,
        };
      }

      const rawTransactions: Transaction[] = await getTransactionsFromRepo(
        activeMonth.id,
      );

      if (rawTransactions.length === 0) {
        return {
          transactions: [],
          currentTotal: activeMonth.total,
          startingTotal: activeMonth.total,
          activeMonthId: activeMonth.id,
        };
      }

      const transactions = calculateTotalForTransactions(
        activeMonth.total,
        rawTransactions,
      );

      const lastTransaction = transactions[0];
      return {
        transactions,
        currentTotal: lastTransaction.total,
        startingTotal: activeMonth.total,
        activeMonthId: activeMonth.id,
      };
    } catch (error) {
      throw error;
    }
  };

const calculateTotalForTransactions = (
  total: number,
  transactions: Transaction[],
) => {
  for (let i = transactions.length - 1; i >= 0; i--) {
    const transaction = transactions[i];
    if (transaction.isWithdrawal) {
      total = total - transaction.amount;
    } else {
      total = total + transaction.amount;
    }
    transaction.total = total;
  }

  return transactions;
};
