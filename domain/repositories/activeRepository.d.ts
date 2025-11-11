import { ActiveMonth } from "../entities/ActiveMonth";

export type GetActiveMonth = () => Promise<ActiveMonth>

export type GetPeriodById = (periodId: number) => Promise<ActiveMonth>;

export type AddNewPeriod = (period: Omit<ActiveMonth, "id">) => Promise<ActiveMonth>;
