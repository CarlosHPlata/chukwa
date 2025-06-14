import { render } from "@testing-library/react-native";
import ErrorComponent from "../error";


describe("Error Component", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it("renders error message for error types", () => {
    const error = new Error("Test error");
    const { getByText } = render(<ErrorComponent error={error} />);
    expect(getByText("Test error")).toBeTruthy();
  });

  it("renders error message for error strings", () => {
    const error = "Test error";
    const { getByText } = render(<ErrorComponent error={error} />);
    expect(getByText("Test error")).toBeTruthy();
  });
});
