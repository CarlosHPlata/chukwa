import { ActiveTransactionsAggregate, PresentTransactionAggregate } from "../aggregates/ActiveTransactionsAggregate";
import { ActiveMonth } from "../entities/ActiveMonth";
import { Transaction } from "../entities/Transaction";
import { GetActiveMonth } from "../repositories/activeRepository";
import { GetTransactionsByActiveMonth } from "../repositories/transactionRepository";

export const getActiveTransactions =
  (
    getTransactionsFromRepo: GetTransactionsByActiveMonth,
    getActiveMonth: GetActiveMonth,
  ) =>
    async (): Promise<ActiveTransactionsAggregate> => getTransactions(getTransactionsFromRepo, getActiveMonth);

const getTransactions = async (getTransactionsFromRepo: GetTransactionsByActiveMonth, getActiveMonth: GetActiveMonth,): Promise<ActiveTransactionsAggregate> => {
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

  const transactions: PresentTransactionAggregate[] = calculateTotalForTransactions(
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
}

const calculateTotalForTransactions = (
  total: number,
  transactions: Transaction[],
) => {
  const pTransactions = transactions.map((t) => ({ ...t, total: 0 }));
  for (let i = pTransactions.length - 1; i >= 0; i--) {
    const transaction = pTransactions[i];
    if (transaction.isWithdrawal) {
      total = total - transaction.amount;
    } else {
      total = total + transaction.amount;
    }
    transaction.total = total;
  }

  return pTransactions;
};
