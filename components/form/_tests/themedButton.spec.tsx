import { render, fireEvent } from "@testing-library/react-native";
import ThemedButton from "../themedButton";

describe("ThemedButton", () => {
  it("should render the button correcly", () => {
    const tree = render(
      <ThemedButton label="Click Me" onPress={() => {}} />,
    );

    expect(tree).toMatchSnapshot();
  });

  it("should handle press events", () => {
    const mockOnPress = jest.fn();
    const renderTree = render(
      <ThemedButton label="Click Me" onPress={mockOnPress} />,
    );

    const button = renderTree.getByTestId("themed-button:Pressable");
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("should display the correct label", () => {
    const label = "Click Me";
    const renderTree = render(
      <ThemedButton label={label} onPress={() => {}} />,
    );

    const buttonLabel = renderTree.getByTestId("themed-button:Label");
    expect(buttonLabel.props.children).toBe(label);
  });
});
