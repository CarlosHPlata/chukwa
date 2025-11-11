import { CURRENCY_PRECISION } from "../constants";

export const toCurrency = (amount: number): string => {
  amount = amount / CURRENCY_PRECISION; // Convert from cents to euros
  return new Intl.NumberFormat("es-Es", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};

export const toFixedInt = (value: number): number => {
  const result = value * CURRENCY_PRECISION;
  if (!Number.isInteger(result)) {
    throw new Error(`Non-integer result: ${result}`);
  }
  return result;
};
