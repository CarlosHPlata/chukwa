import { VIEW_DATE_FORMAT, VIEW_DATETIME_FORMAT } from "@/domain/constants";
import { render } from "@testing-library/react-native";
import { DateTime } from "luxon";
import ThemedDateTimePicker from "../themedDateTimePicker";

describe("ThemedDateTimePicker", () => {
  it("renders correctly", () => {
    const date = DateTime.fromISO("2023-10-01T12:00:00").toJSDate();
    const mockOnDateChanged = jest.fn();
    const tree = render(
      <ThemedDateTimePicker
        label="date"
        value={date}
        onDateChanged={mockOnDateChanged}
        mode="datetime"
      />,
    );

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with initial date in date mode", () => {
    const initialDate = DateTime.fromISO("2023-10-01T12:00:00")
    const date = initialDate.toJSDate();
    const expectedFormattedDate = initialDate.toFormat(VIEW_DATE_FORMAT);
    const mockOnDateChanged = jest.fn();
    const { getByText } = render(
      <ThemedDateTimePicker
        label="date"
        value={date}
        onDateChanged={mockOnDateChanged}
        mode="date"
      />,
    );

    expect(getByText(expectedFormattedDate)).toBeTruthy();
  });
  
  it("renders correctly with initial date in datetime mode", () => {
    const initialDate = DateTime.fromISO("2023-10-01T12:00:00")
    const date = initialDate.toJSDate();
    const expectedFormattedDate = initialDate.toFormat(VIEW_DATETIME_FORMAT);

    const mockOnDateChanged = jest.fn();
    const { getByText } = render(
      <ThemedDateTimePicker
        label="date"
        value={date}
        onDateChanged={mockOnDateChanged}
        mode="datetime"
      />,
    );

    expect(getByText(expectedFormattedDate)).toBeTruthy();
  });
});
