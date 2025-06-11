import { VIEW_DATE_FORMAT, VIEW_DATETIME_FORMAT } from "@/domain/constants";
import { DateTime } from "luxon";

export type DateType = "date" | "datetime" | "time" | "countdown";
export default function useFormattedDate(
  date: Date,
  type: DateType,
): string {
  switch (type) {
    case "date":
      return DateTime.fromJSDate(date).toFormat(VIEW_DATE_FORMAT);
    case "datetime":
      return DateTime.fromJSDate(date).toFormat(VIEW_DATETIME_FORMAT);
    default:
      return DateTime.fromJSDate(date).toFormat(VIEW_DATETIME_FORMAT);
  }
}
