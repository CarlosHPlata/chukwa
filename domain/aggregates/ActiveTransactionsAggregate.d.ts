
export interface ActiveTransactionsAggregate {
  transactions: Transaction[];
  currentTotal: number;
  startingTotal: number;
  activeMonthId: number;
}
