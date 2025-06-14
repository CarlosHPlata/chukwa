import { NotSavedTransaction } from "../../entities/Transaction";
import { CreateTransaction } from "../../repositories/transactionRepository";
import {
  CreateTransactionService,
  createTransactionService,
} from "../CreateTransactionService";

describe("CreateTransaction", () => {
  const repositoryMock: CreateTransaction = jest.fn();
  let service: CreateTransactionService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = createTransactionService(repositoryMock);
  });

  it("should create a transaction successfully", async () => {
    const transaction: NotSavedTransaction = {
      date: new Date(),
      concept: { id: "1", icon: "icon1", name: "Concept 1" },
      description: "Test transaction",
      amount: 100,
      userId: ["1"],
      origin: { icon: "origin1", id: "1", name: "Origin 1" },
      isWithdrawal: false,
    };

    await service(transaction, 1);

    expect(repositoryMock).toHaveBeenCalledWith(transaction, 1);
  });

  it("should validate amount is not negative", async () => {
    const transaction: NotSavedTransaction = {
      date: new Date(),
      concept: { id: "1", icon: "icon1", name: "Concept 1" },
      description: "Test transaction",
      amount: -100,
      userId: ["1"],
      origin: { icon: "origin1", id: "1", name: "Origin 1" },
      isWithdrawal: false,
    };

    await expect(service(transaction, 1)).rejects.toThrow("Amount cannot be negative");
  });

  it("should validate concept and origin are provided", async () => {
    const transaction: NotSavedTransaction = {
      date: new Date(),
      concept: { id: "1", icon: "icon1", name: "Concept 1" },
      description: "Test transaction",
      amount: 100,
      userId: ["1"],
      origin: { id: "", icon: "icon1", name: "Origin 1" }, // Missing origin
      isWithdrawal: false,
    };
    const transaction2: NotSavedTransaction = {
      date: new Date(),
      concept: { id: "", icon: "icon1", name: "Concept 1" },
      description: "Test transaction",
      amount: 100,
      userId: ["1"],
      origin: { id: "1", icon: "icon1", name: "Origin 1" }, // Missing origin
      isWithdrawal: false,
    };

    await expect(service(transaction, 1)).rejects.toThrow("Origin must be provided");
    await expect(service(transaction2, 1)).rejects.toThrow("Concept must be provided");
  });

  it("should validate description is not empty", async () => {
    const transaction: NotSavedTransaction = {
      date: new Date(),
      concept: { id: "1", icon: "icon1", name: "Concept 1" },
      description: "",
      amount: 100,
      userId: ["1"],
      origin: { icon: "origin1", id: "1", name: "Origin 1" },
      isWithdrawal: false,
    };
    const transaction2: NotSavedTransaction = {
      date: new Date(),
      concept: { id: "1", icon: "icon1", name: "Concept 1" },
      description: "a".repeat(256), // Too long description
      amount: 100,
      userId: ["1"],
      origin: { icon: "origin1", id: "1", name: "Origin 1" },
      isWithdrawal: false,
    };

    await expect(service(transaction, 1)).rejects.toThrow("Description must be between 1 and 255 characters");
    await expect(service(transaction2, 1)).rejects.toThrow("Description must be between 1 and 255 characters");
  });

  it("should validate userId is provided", async () => {
    const transaction: NotSavedTransaction = {
      date: new Date(),
      concept: { id: "1", icon: "icon1", name: "Concept 1" },
      description: "Test transaction",
      amount: 100,
      userId: [], // No user ID
      origin: { icon: "origin1", id: "1", name: "Origin 1" },
      isWithdrawal: false,
    };

    await expect(service(transaction, 1)).rejects.toThrow("User ID must be provided");
  });

});
