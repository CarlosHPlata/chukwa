import { PresentTransactionAggregate } from "@/domain/aggregates/ActiveTransactionsAggregate";
import { VIEW_DATETIME_FORMAT } from "@/domain/constants";
import { fireEvent, render } from "@testing-library/react-native";
import { DateTime } from "luxon";
import TransactionItem from "../TransactionItem";

jest.mock('@expo/vector-icons/MaterialIcons', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ name, ...props }: { name: string } & unknown) => {
      return React.createElement('MaterialIcons', { ...props, 'data-icon': name });
    },
  };
});

describe("TransactionItem", () => {
  const date = DateTime.fromISO("2023-10-01T12:00:00Z");
  const mockTransaction: PresentTransactionAggregate = {
    id: "1",
    description: "Test Transaction",
    amount: 100,
    total: 150,
    date: date.toJSDate(),
    isWithdrawal: false,
    concept: { icon: "payment", name: "Payment", id: "1" },
    origin: { icon: "payment", name: "balance", id: "1" },
    userId: ["1"],
  };


  it("renders correctly", () => {
    const { toJSON, getByText } = render(
      <TransactionItem transaction={mockTransaction} onPress={() => {}} />
    );

    expect(getByText("Test Transaction")).toBeTruthy();
    expect(getByText("0,15 €")).toBeTruthy();
    expect(getByText(date.toFormat(VIEW_DATETIME_FORMAT))).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <TransactionItem transaction={mockTransaction} onPress={onPressMock} />
    );

    fireEvent.press(getByTestId("transaction-item:pressable"));
    expect(onPressMock).toHaveBeenCalledWith(mockTransaction);
  });
});
