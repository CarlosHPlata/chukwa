import { NotSavedTransaction } from "@/domain/entities/Transaction";
import { render } from "@testing-library/react-native";
import EditTransaction from "../EditTransaction";
import { DateTime } from "luxon";

describe("EditTransaction", () => {
  it("renders correctly with initial values", () => {
    const initialTransaction: NotSavedTransaction = {
      amount: 10000,
      date: DateTime.fromISO("2023-10-01T12:00:00Z").toJSDate(),
      isWithdrawal: true,
      description: "Test Transaction",
      concept: { id: "1", name: "Test Concept" },
      origin: { id: "1", name: "Test Origin" },
      userId: ["1"],
    };

    const { toJSON } = render(
      <EditTransaction
        initialValue={initialTransaction}
        concepts={[{ icon: 'payment', id: "1", name: "Test Concept" }]}
        origins={[{ icon: 'payment', id: "1", name: "Test Origin" }]}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("Give different date when no initial value is provided for two consecutive renders", () => {
    const { rerender, toJSON } = render(<EditTransaction />);

    const firstRender = toJSON();
    rerender(<EditTransaction />);
    const secondRender = toJSON();

    expect(firstRender).not.toEqual(secondRender);
  });
});
