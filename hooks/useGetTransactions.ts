import { Transaction } from "@/domain/entities/Transaction";
import { getTransactions } from "@/repositories/TransactionRepository";
import { AsyncResponse } from "./AsyncResponse";
import useAsyncValues from "./useAsyncValues";

export default function useGetTransaction(): AsyncResponse<Transaction[]> {
  return useAsyncValues(getTransactions);
}
