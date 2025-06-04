import { VIEW_DATETIME_FORMAT } from "@/domain/constants";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  value: Date;
  onDateChanged: (date: Date) => void;
  format?: string;
  mode?: "date" | "time" | "datetime" | "countdown";
};

export default function ThemedDateTimePicker({
  label,
  value,
  onDateChanged,
  format = VIEW_DATETIME_FORMAT,
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

  const formatedDate: string = useMemo(() => {
    return moment(value).format(format)
  }, [value, format]);

  return (
    <>
      <Text>{label}</Text>
      <Pressable onPress={onButtonPressed}>
        <Text>{formatedDate}</Text>
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
