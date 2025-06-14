import { render, fireEvent } from "@testing-library/react-native";
import ThemedTextInput from "../themedTextInput";

describe("ThemedTextInput", () => {
  it ("renders correctly", () => {
    const tree = render(<ThemedTextInput label="Test Input" onChangeText={() => {}} />);

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with initial value", () => {
    const { getByTestId } = render(
      <ThemedTextInput
        label="Test Input"
        value="Initial Value"
        onChangeText={() => {}}
      />
    );
    const input = getByTestId("themed-text-input:TextInput");
    expect(input.props.value).toBe("Initial Value");
  });

  it("calls onChangeText when text is changed", () => {
    const mockOnChangeText = jest.fn();
    const { getByTestId } = render(
      <ThemedTextInput
        label="Test Input"
        value=""
        onChangeText={mockOnChangeText}
      />
    );
    const input = getByTestId("themed-text-input:TextInput");
    
    fireEvent.changeText(input, "New Value");
    expect(mockOnChangeText).toHaveBeenCalledWith("New Value");
  });
});
