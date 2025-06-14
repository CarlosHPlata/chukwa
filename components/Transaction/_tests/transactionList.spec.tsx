import { render } from "@testing-library/react-native";
import TransactionList from "../TransactionList";

jest.mock('@expo/vector-icons/MaterialIcons', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ name, ...props }: { name: string } & unknown) => {
      return React.createElement('MaterialIcons', { ...props, 'data-icon': name });
    },
  };
});

describe("TransactionList", () => {
  const mockTransactions = [
    {
      id: "1",
      description: "Test Transaction 1",
      amount: 100,
      total: 150,
      date: new Date("2023-10-01T12:00:00Z"),
      isWithdrawal: false,
      concept: { icon: "payment", name: "Payment", id: "1" },
      origin: { icon: "payment", name: "balance", id: "1" },
      userId: ["1"],
    },
    {
      id: "2",
      description: "Test Transaction 2",
      amount: 200,
      total: 250,
      date: new Date("2023-10-02T12:00:00Z"),
      isWithdrawal: true,
      concept: { icon: "payment", name: "Withdrawal", id: "2" },
      origin: { icon: "payment", name: "bank", id: "2" },
      userId: ["1"],
    },
  ];

  it("renders correctly with transactions", () => {
    const { toJSON } = render(
      <TransactionList transactions={mockTransactions} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
