import Header from "@/components/custom/Header";
import Heading from "@/components/custom/Heading";
import { colors, styles } from "@/styles/styles";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Button, RadioButton } from "react-native-paper";

export default function Payment() {
  const params = useLocalSearchParams();

  const [payment, setPayment] = useState("COD");

  const isAuthenticated = true;
  const redirectToLogin = () => {};
  const codHandler = () => {};
  const onlineHandler = () => {};
  return (
    <View
      style={{
        ...styles.defaultStyle,
      }}
    >
      <Header back={true} emptyCart={false} />
      <Heading
        containerStyle={{ paddingTop: 70 }}
        text1="Payment"
        text2="Method"
      />
      <View style={localStyles.container}>
        <RadioButton.Group onValueChange={setPayment} value={payment}>
          <View style={localStyles.radio}>
            <Text style={localStyles.radioText}>Cash On Delivery</Text>
            <RadioButton color={colors.color1} value="COD" />
          </View>
          <View style={localStyles.radio}>
            <Text style={localStyles.radioText}>Online</Text>
            <RadioButton color={colors.color1} value="ONLINE" />
          </View>
        </RadioButton.Group>
      </View>
      <TouchableOpacity
        onPress={
          !isAuthenticated
            ? redirectToLogin
            : payment === "COD"
            ? codHandler
            : onlineHandler
        }
      >
        <Button
          style={localStyles.btn}
          textColor={colors.color2}
          icon={payment === "COD" ? "check-circle" : "circle-multiple-outline"}
        >
          {payment === "COD" ? "Place Order" : "Pay"}
        </Button>
      </TouchableOpacity>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    marginVertical: 20,
    flex: 1,
    justifyContent: "center",
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  radioText: {
    fontWeight: 600,
    fontSize: 18,
    textTransform: "uppercase",
    color: colors.color2,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    margin: 5,
  },
});
