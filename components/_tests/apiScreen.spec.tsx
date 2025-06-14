import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import ApiScreen from "../apiScreen";

describe("ApiScreen", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it("renders correctly", () => {
    const { toJSON } = render(
      <ApiScreen isLoading={false} error={undefined}>
        <></>
      </ApiScreen>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  
  it("renders loading state", () => {
    const { getByTestId } = render(
      <ApiScreen isLoading={true} error={undefined}>
        <></>
      </ApiScreen>
    );

    expect(getByTestId("api-screen:activity-indicator")).toBeTruthy();
  });

  it("renders error state", () => {
    const error = new Error("Test error");
    const { getByText } = render(
      <ApiScreen isLoading={false} error={error}>
        <></>
      </ApiScreen>
    );
    expect(getByText("Test error")).toBeTruthy();
  });

  it("renders children when not loading and no error", () => {
    const { getByText } = render(
      <ApiScreen isLoading={false} error={undefined}>
        <Text>Content</Text>
      </ApiScreen>
    );

    expect(getByText("Content")).toBeTruthy();
  });
});
