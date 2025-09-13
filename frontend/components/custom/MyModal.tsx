import { colors } from "@/styles/styles";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Button } from "react-native-paper";

type MyModalProps = {
  id: string;
  deleteHandler: (id: string) => void;
  navigate: (id:string) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MyModal(props: MyModalProps) {
  return (
    <View style={modalStyles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
        onPress={() => props.setOpenModal(false)}
      >
        <Avatar.Icon
          icon={"close"}
          size={25}
          style={{
            backgroundColor: colors.color1,
          }}
        />
      </TouchableOpacity>
      <Text
        style={modalStyles.text}
        onPress={() => router.push(`/update-product/${props.id}`)}
      >
        Edit
      </Text>
      <Button textColor={colors.color3} onPress={() => props.deleteHandler(props.id)}>Delete</Button>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  container: {
    elevation: 10,
    width: 200,
    height: 100,
    alignSelf: "center",
    justifyContent: "center",
    zIndex: 100,
    backgroundColor: colors.color2,
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontWeight: 900,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
