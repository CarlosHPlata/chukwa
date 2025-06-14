import { Transaction } from "../entities/Transaction";

export type PresentTransactionAggregate = Transaction & {
  total: number;
}

export interface ActiveTransactionsAggregate {
  transactions: PresentTransactionAggregate[];
  currentTotal: number;
  startingTotal: number;
  activeMonthId: number;
}

