import { SAVE_DATE_FORMAT } from "@/domain/constants";
import { DateTime } from "luxon";

export const todayDateString = (): string => {
  return DateTime.fromJSDate(new Date()).toFormat(SAVE_DATE_FORMAT);
};
