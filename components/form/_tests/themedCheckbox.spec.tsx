import { render, fireEvent } from "@testing-library/react-native";
import ThemedCheckbox from "../themedCheckbox";

describe("ThemedCheckbox", () => {
  it("should render the checkbox correctly", () => {
    const tree = render(
      <ThemedCheckbox label="Accept Terms" value={false} onValueChange={() => { }} />,
    );

    expect(tree).toMatchSnapshot();
  });

  it("should handle value change events", () => {
    const mockOnValueChange = jest.fn();
    const renderTree = render(
      <ThemedCheckbox label="Accept Terms" value={false} onValueChange={mockOnValueChange} />,
    );

    const checkbox = renderTree.getByTestId("themed-checkbox:Checkbox");
    fireEvent(checkbox, "valueChange", true);

    expect(mockOnValueChange).toHaveBeenCalledWith(true);
  });

  it("should display the correct label", () => {
    const label = "Accept Terms";
    const renderTree = render(
      <ThemedCheckbox label={label} value={false} onValueChange={() => { }} />,
    );

    const checkboxLabel = renderTree.getByText(label);
    expect(checkboxLabel).toBeTruthy();
  });
});
