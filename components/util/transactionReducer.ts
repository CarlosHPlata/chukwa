import { Concept } from "@/domain/entities/Concept";
import { Origin } from "@/domain/entities/Origin";
import { NotSavedTransaction } from "@/domain/entities/Transaction";

export const transactionReducer = (
  state: NotSavedTransaction,
  action: { type: string; payload: unknown },
): NotSavedTransaction => {
  switch (action.type) {
    case "SET_AMOUNT":
      let amount = parseFloat(action.payload as string);
      if (isNaN(amount)) {
        return { ...state, amount: 0 };
      }
      return { ...state, amount };

    case "SET_DESCRIPTION":
      return { ...state, description: action.payload as string };

    case "SET_CONCEPT":
      if (!action.payload || typeof action.payload !== "object") {
        return state;
      }
      return { ...state, concept: action.payload as Concept };

    case "SET_ORIGIN":
      if (!action.payload || typeof action.payload !== "object") {
        return state;
      }
      return { ...state, origin: action.payload as Origin };

    case "SET_DATE":
      return { ...state, date: action.payload as Date };

    case "SET_IS_WITHDRAWAL":
      return { ...state, isWithdrawal: action.payload as boolean };

    default:
      return state;
  }
};
