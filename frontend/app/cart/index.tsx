import Header from "@/components/custom/Header";
import Heading from "@/components/custom/Heading";
import { colors, styles } from "@/styles/styles";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import CartItem from "./CartItem";
import { router } from "expo-router";
import { cartItems } from "@/data/data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Cart() {

  const dispatch = useDispatch();
  const {cartItems} = useSelector((state: RootState) => state.cart);

  const incrementHandler = (id: string, quantity: number, stock: number) => {
    if(stock > quantity){
      
    }
  }
  const decrementHandler = (id: string, quantity: number, stock: number) => {
    if(quantity > 0){

    }
  }

  const handleNavigate = (id: string) => {
    router.push(`/products/${id}`);
  }

  return (
    <View
      style={{
        ...styles.defaultStyle,
        padding: 0,
      }}
    >
      <Header back={true} emptyCart={true} />

      <Heading
        text1={"Shopping"}
        text2={"Cart"}
        containerStyle={{
          paddingTop: 70,
          marginLeft: 35,
        }}
      />

      <View
        style={{
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItems.map((item, index) => (
            <CartItem
              index = {index}
              key={index}
              id={item.product}
              name={item.name}
              stock={item.stock}
              price = {item.price}
              image={item.image}
              quantity={item.quantity}
              incrementHandler = {incrementHandler}
              decrementHandler = {decrementHandler}
              handleNavigate = {handleNavigate}
            />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 35,
        }}
      >
        <Text>5 Items</Text>
        <Text>$3</Text>
      </View>
      <TouchableOpacity onPress = {cartItems.length > 0 ? () => router.push("/order"): undefined}>
        <Button
          style={{
            backgroundColor: colors.color3,
            borderRadius: 100,
            padding: 5,
            margin: 30,
          }}
          icon={"cart"}
          textColor={colors.color2}
        >
          Checkout
        </Button>
      </TouchableOpacity>
    </View>
  );
}
