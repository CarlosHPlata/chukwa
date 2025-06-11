import useFormattedDate, { DateType } from "@/hooks/useFormattedDate";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useCallback, useState } from "react";
import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  value: Date;
  onDateChanged: (date: Date) => void;
  mode?: DateType;
};

export default function ThemedDateTimePicker({
  label,
  value,
  onDateChanged,
  mode = "datetime",
}: Props) {
  const [show, setShow] = useState<boolean>(false);

  const onButtonPressed = () => {
    setShow(true);
  };

  const onCurrentDateChanged = useCallback(
    (_: DateTimePickerEvent, selectedDate: Date | undefined) => {
      const currentDate = selectedDate;
      setShow(false);
      if (currentDate) onDateChanged(currentDate);
    },
    [onDateChanged],
  );

  const formattedDate = useFormattedDate(value, mode);

  return (
    <>
      <Text>{label}</Text>
      <Pressable onPress={onButtonPressed}>
        <Text>{formattedDate}</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          testID="datePicker"
          value={value}
          mode={mode}
          onChange={onCurrentDateChanged}
        />
      )}
    </>
  );
}
