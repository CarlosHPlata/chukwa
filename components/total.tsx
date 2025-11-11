import useFormattedCurrency from "@/hooks/useFormattedCurrency";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import ThemedPressableIcon from "./form/ThemedPressableIcon";
import { router } from "expo-router";

type TotalProps = {
  startingTotal: number;
  total: number;
  currentPeriodId: number;
};

export default function Total({ total = 0, startingTotal, currentPeriodId }: TotalProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const formattedStartingTotal = useFormattedCurrency(startingTotal);
  const formattedCurrentTotal = useFormattedCurrency(total);

  const handleConfirm = () => {
    setModalVisible(false);
    router.push(`/period/overview/${currentPeriodId}`);
  }

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "column",
            paddingLeft: 10,
            justifyContent: "center",
          }}
        >
          <ThemedPressableIcon
            onPress={() => setModalVisible(true)}
            icon="refresh"
            size={20}
            color="grey"
          ></ThemedPressableIcon>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            marginLeft: -30,
          }}
        >
          <Text style={{ fontSize: 10, color: "grey" }}>
            {formattedStartingTotal}
          </Text>
          <Text
            style={{
              fontSize: 50,
              marginTop: -10,
              paddingTop: 0,
              color: "green",
            }}
          >
            {formattedCurrentTotal}
          </Text>
        </View>
      </View>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 24,
              borderRadius: 12,
              alignItems: "center",
              width: 300,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 16 }}>
              Are you sure you want to start a new period?
            </Text>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <Pressable
                style={{
                  backgroundColor: "green",
                  padding: 10,
                  borderRadius: 8,
                  marginRight: 8,
                }}
                onPress={handleConfirm}
              >
                <Text style={{ color: "#fff" }}>Confirm</Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#ccc",
                  padding: 10,
                  borderRadius: 8,
                }}
                onPress={handleCancel}
              >
                <Text>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
