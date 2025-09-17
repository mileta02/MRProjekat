import Header from "@/components/custom/Header";
import Heading from "@/components/custom/Heading";
import { colors, styles } from "@/styles/styles";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import OrderItem from "./OrderItem";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";

export default function Order() {

  const { cartItems } = useSelector((state:RootState) => state.cart);
  const [subtotal] = useState(cartItems.reduce(
    (prev, curr) => prev + curr.quantity * curr.price, 0)
  );
  const [ shipping ] = useState( subtotal > 10000 ? 0 : 200);
  const [ tax ] = useState(Number((0.20 * subtotal).toFixed()));
  const [ total ] = useState( subtotal + shipping + tax );

  return (
    <View
      style={{
        ...styles.defaultStyle,
      }}
    >
      <Header back={true} emptyCart={false} />
      <Heading
        containerStyle={{
          paddingTop: 70,
        }}
        text1="Confirm"
        text2="Order"
      />
      <View
        style={{
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <ScrollView>
          {cartItems.map((item, index) => (
            <OrderItem
              key={index}
              price={item.price}
              image={item.image}
              name={item.name}
              quantity={item.quantity}
            />
          ))}
        </ScrollView>
      </View>
      <PriceTag name={"Subtotal"} price={subtotal} />
      <PriceTag name={"Shipping"} price={shipping} />
      <PriceTag name={"Tax"} price={tax} />
      <PriceTag name={"Total"} price={total} />

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/payment",
            params: {
              subtotal: subtotal.toString(),
              shipping: shipping.toString(),
              tax: tax.toString(),
              total: total.toString(),
            },
          })
        }
      >
        <Button
          style={{
            backgroundColor: colors.color3,
            borderRadius: 100,
            padding: 5,
            margin: 10,
          }}
          textColor={colors.color2}
          icon={"chevron-right"}
        >
          Payment
        </Button>
      </TouchableOpacity>
    </View>
  );
}

const PriceTag = ({ name, price }: { name: string; price: number }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 5,
    }}
  >
    <Text style={{ fontWeight: "800" }}>{name}</Text>
    <Text>{price}</Text>
  </View>
);
