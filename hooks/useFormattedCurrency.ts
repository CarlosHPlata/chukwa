import { toCurrency } from "@/domain/utils/currency";

export default function useFormattedCurrency(amount: number): string {
  return toCurrency(amount);
}
