import { AppDispatch } from "@/redux/store";
import { colors } from "@/styles/styles";
import { RootStackParamList } from "@/types/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { useDispatch } from "react-redux";

const Header = ({ back, emptyCart }: { back: boolean; emptyCart: boolean }) => {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  const dispatch = useDispatch<AppDispatch>();
  const emptyCartHandler = () => {
    dispatch({
      type:"clearCart",
    })
  };


  return (
    <>
      {back && (
        <TouchableOpacity
          style={{ position: "absolute", left: 20, top: 40, zIndex: 10 }}
          onPress={() => navigate.goBack()}
        >
          <Avatar.Icon
            icon={"arrow-left"}
            color={
              route.name.startsWith("products") ? colors.color2 : colors.color3
            }
            style={{ backgroundColor: colors.color4 }}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{ position: "absolute", right: 20, top: 40, zIndex: 10 }}
        onPress={emptyCart ? emptyCartHandler : () => router.push("/cart")}
      >
        <Avatar.Icon
          icon={emptyCart ? "delete-outline" : "cart-outline"}
          color={
            route.name.startsWith("products") ? colors.color2 : colors.color3
          }
          style={{ backgroundColor: colors.color4 }}
        />
      </TouchableOpacity>
    </>
  );
};

export default Header;
