import { NotSavedTransaction } from "@/domain/entities/Transaction";
import { render } from "@testing-library/react-native";
import EditTransaction from "../EditTransaction";

describe("EditTransaction", () => {
  it("renders correctly with initial values", () => {
    const initialTransaction: NotSavedTransaction = {
      amount: 10000,
      date: new Date(),
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

});