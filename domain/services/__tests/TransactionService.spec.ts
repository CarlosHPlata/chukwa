import { Transaction } from "../../entities/Transaction";
import { GetActiveMonth } from "../../repositories/activeRepository";
import { GetTransactionsByActiveMonth } from "../../repositories/transactionRepository";
import { getActiveTransactions } from "../TransactionService";

describe("TransactionService", () => {
  const getTransactionsRepoMock: GetTransactionsByActiveMonth = jest.fn();
  const getActiveMonthMock: GetActiveMonth = jest.fn();
  let transactionsService: ReturnType<typeof getActiveTransactions>;
  beforeEach(() => {
    jest.clearAllMocks();
    transactionsService = getActiveTransactions(
      getTransactionsRepoMock,
      getActiveMonthMock,
    );
  });

  describe("getActiveTransactions", () => {
    it("should return transactions from an active month", async () => {
      const mockActiveMonth = { id: 1, total: 300, startDate: "" };
      const mockTransactions: Transaction[] = [
        {
          id: "1",
          date: new Date(),
          concept: { icon: "icon1" },
          description: "Test Transaction 1",
          amount: 100,
          userId: ["1"],
          origin: { icon: "originIcon1" },
          isWithdrawal: false,
        },
        {
          id: "2",
          date: new Date(),
          concept: { icon: "icon2" },
          description: "Test Transaction 2",
          amount: 200,
          userId: ["1"],
          origin: { icon: "originIcon2" },
          isWithdrawal: true,
        },
      ];

      (getActiveMonthMock as jest.Mock).mockResolvedValue(mockActiveMonth);
      (getTransactionsRepoMock as jest.Mock).mockResolvedValue(
        mockTransactions,
      );
      const aggregate = await transactionsService();

      expect(aggregate.transactions[0].id).toBe(mockTransactions[0].id);
      expect(aggregate.transactions[1].id).toBe(mockTransactions[1].id);
    });

    it("Based on the active month total, it should calculate the total for transactions", async () => {
      const mockActiveMonth = { id: 1, total: 300, startDate: "" };
      const mockTransactions: Transaction[] = [
        {
          id: "1",
          date: new Date(),
          concept: { icon: "icon1" },
          description: "Test Transaction 1",
          amount: 100,
          userId: ["1"],
          origin: { icon: "originIcon1" },
          isWithdrawal: false,
        },
        {
          id: "2",
          date: new Date(),
          concept: { icon: "icon2" },
          description: "Test Transaction 2",
          amount: 200,
          userId: ["1"],
          origin: { icon: "originIcon2" },
          isWithdrawal: true,
        },
      ];

      (getActiveMonthMock as jest.Mock).mockResolvedValue(mockActiveMonth);
      (getTransactionsRepoMock as jest.Mock).mockResolvedValue(
        mockTransactions,
      );
      const aggregate = await transactionsService();

      expect(aggregate.transactions[1].total).toBe(100);
      expect(aggregate.transactions[0].total).toBe(200);
      expect(aggregate.currentTotal).toBe(200);
    });
  });
});
