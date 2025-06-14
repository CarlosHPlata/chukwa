import { render, fireEvent } from "@testing-library/react-native";
import ThemedPicker from "../themedPicker";

describe("ThemedCheckbox", () => {
  it("should render the piicker correctly", () => {
    const values = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];
    const renderTree = render(
      <ThemedPicker label="Select Option" values={values} />,
    );

    const picker = renderTree.getByTestId("themed-picker:Picker");
    expect(picker).toBeTruthy();
    expect(renderTree).toMatchSnapshot();
  });

  it("should handle value change events", () => {
    const values = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];
    const mockOnValueChange = jest.fn();
    const renderTree = render(
      <ThemedPicker
        label="Select Option"
        values={values}
        onValueChange={mockOnValueChange}
      />,
    );

    const picker = renderTree.getByTestId("themed-picker:Picker");
    fireEvent(picker, "valueChange", "option2");

    expect(mockOnValueChange).toHaveBeenCalledWith("option2");
  });

  it("should display the correct label", () => {
    const values = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];
    const renderTree = render(
      <ThemedPicker label="Select Option" values={values} />,
    );

    const label = renderTree.getByText("Select Option");
    expect(label).toBeTruthy();
  });
});
