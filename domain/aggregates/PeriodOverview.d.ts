import { ActiveMonth } from "../entities/ActiveMonth";
import { ConceptSummary } from "./ConceptSummary";

export interface PeriodOverviewAggregate extends ActiveMonth {
  endTotal: number
  spent: number
  income: number
  concepts: ConceptSummary[]
}
