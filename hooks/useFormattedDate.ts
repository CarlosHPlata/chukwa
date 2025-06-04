import { VIEW_DATE_FORMAT, VIEW_DATETIME_FORMAT } from "@/domain/constants";
import moment from "moment";

type DateType = "date" | "datetime";
export default function useFormattedDate(
  date: Date,
  type: DateType,
): string {
  switch (type) {
    case "date":
      return moment(date).format(VIEW_DATE_FORMAT);
    case "datetime":
      return moment(date).format(VIEW_DATETIME_FORMAT);
    default:
      return moment(date).format(VIEW_DATETIME_FORMAT);
  }
}
