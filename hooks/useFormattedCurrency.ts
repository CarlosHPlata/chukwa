import { CURRENCY_PRECISION } from "@/domain/constants";

export default function useFormattedCurrency(amount: number): string {
  amount = amount / CURRENCY_PRECISION; // Convert from cents to euros
  return new Intl.NumberFormat("es-Es", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
