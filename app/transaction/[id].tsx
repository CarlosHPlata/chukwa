import ApiScreen from "@/components/apiScreen";
import useDeleteTransaction from "@/hooks/useDeleteTransaction";
import useFormattedCurrency from "@/hooks/useFormattedCurrency";
import useGetTransactionById from "@/hooks/useGetTransactionById";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

export default function TransactionView() {
  const { id } = useLocalSearchParams();
  const {
    data: transaction,
    isLoading,
    error,
  } = useGetTransactionById(id as string);
  const {
    callback: deleteTransaction,
    isLoading: isDeleteLoading,
    error: deleteError,
  } = useDeleteTransaction();

  const [modalVisible, setModalVisible] = useState(false);
  const formattedAmount = useFormattedCurrency(transaction?.amount ?? 0);

  const handleDelete = () => {
    setModalVisible(true);
  };

  const confirmDelete = () => {
    deleteTransaction(id as string);
    router.setParams({ refresh: Date.now() });
    router.back();
    setModalVisible(false);
  };

  const cancelDelete = () => {
    setModalVisible(false);
  };

  return (
    <ApiScreen
      isLoading={isLoading || isDeleteLoading}
      error={error || deleteError}
    >
      <View
        style={{
          flex: 1,
          padding: 24,
          backgroundColor: "#fff",
          borderRadius: 12,
          marginHorizontal: 16,
          elevation: 2,
          marginTop: 50,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
          {transaction?.description}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: transaction?.isWithdrawal ? "#e53935" : "#43a047",
            marginBottom: 8,
            fontWeight: "bold",
          }}
        >
          Amount: {formattedAmount}
        </Text>
        <Text style={{ fontSize: 16, color: "#666", marginBottom: 4 }}>
          Origin:{" "}
          <Text style={{ color: "#222" }}>{transaction?.origin.name}</Text>
        </Text>
        <Text style={{ fontSize: 16, color: "#666" }}>
          Concept:{" "}
          <Text style={{ color: "#222" }}>{transaction?.concept.name}</Text>
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 50,
          paddingHorizontal: 10,
          paddingTop: 10,
          marginTop: 10,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#353b48" : "#25292e",
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 15,
              shadowColor: pressed ? "#fff" : undefined,
              shadowOffset: pressed ? { width: 0, height: 0 } : undefined,
              shadowOpacity: pressed ? 0.6 : 0,
              shadowRadius: pressed ? 8 : 0,
            },
          ]}
          onPress={handleDelete}
        >
          <MaterialIcons name="delete" size={28} color="white" />
        </Pressable>
      </View>


      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={cancelDelete}
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
              Are you sure you want to delete?
            </Text>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <Pressable
                style={{
                  backgroundColor: "#e53935",
                  padding: 10,
                  borderRadius: 8,
                  marginRight: 8,
                }}
                onPress={confirmDelete}
              >
                <Text style={{ color: "#fff" }}>Delete</Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#ccc",
                  padding: 10,
                  borderRadius: 8,
                }}
                onPress={cancelDelete}
              >
                <Text>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ApiScreen>
  );
}
