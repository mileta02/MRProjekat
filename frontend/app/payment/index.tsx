import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors, styles } from "@/styles/styles";
import Header from "@/components/custom/Header";
import Heading from "@/components/custom/Heading";
import { Button, RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "@/redux/actions/otherActions";
import { useMessageAndErrorOther } from "@/utils/hooks";
import axios from "axios";
import { AppDispatch, RootState, server } from "@/redux/store";
import Loader from "@/components/custom/Loader";
import { router, useLocalSearchParams } from "expo-router";
// import { clearCart } from "@/redux/reducers/cartReducer"; // Used in useMessageAndErrorOther

const Payment: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loaderLoading, setLoaderLoading] = useState(false);
  const params = useLocalSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const redirectToLogin = () => {
    router.push("/login");
  };
  
  const codHandler = (paymentInfo?: any) => {
    const shippingInfo = {
      address: user.address,
      city: user.city,
      country: user.country,
      pinCode: user.pinCode,
    };

    const itemsPrice = params.itemsPrice ? Number(params.itemsPrice) : 0;
    const shippingCharges = params.shippingCharges ? Number(params.shippingCharges) : 0;
    const taxPrice = params.tax ? Number(params.tax) : 0;
    const totalAmount = params.totalAmount ? Number(params.totalAmount) : 0;

    dispatch(
      placeOrder(
        cartItems,
        shippingInfo,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        paymentInfo
      )
    );
  };
  
  const onlineHandler = async () => {
    try {
      const {
        data: { client_secret },
      } = await axios.post(
        `${server}/order/payment`,
        {
          totalAmount: params.totalAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Stripe integration would go here
      console.log("Online payment client_secret:", client_secret);
      // For now, just call codHandler with mock payment info
      codHandler({ id: "mock_payment_id", status: "Succeeded" });
      
    } catch (error: any) {
      console.error("Payment error:", error);
      setLoaderLoading(false);
    }
  };

  const loading = useMessageAndErrorOther(
    dispatch,
    null,
    "profile",
    () => ({ type: "cart/clearCart" })
  );
  return loaderLoading ? (
    <Loader />
  ) : (
    <View style={styles.defaultStyle}>
      <Header back={true} emptyCart={false} />
      <Heading
        containerStyle={{
          paddingTop: 70,
        }}
        text1="Payment"
        text2="Method"
      />

      <View style={localStyles.container}>
        <RadioButton.Group
          onValueChange={setPaymentMethod}
          value={paymentMethod}
        >
          <View style={localStyles.radioStyle}>
            <Text style={localStyles.radioStyleText}>Cash On Delivery</Text>
            <RadioButton color={colors.color1} value={"COD"} />
          </View>
          <View style={localStyles.radioStyle}>
            <Text style={localStyles.radioStyleText}>ONLINE</Text>
            <RadioButton color={colors.color1} value={"ONLINE"} />
          </View>
        </RadioButton.Group>
      </View>

      <TouchableOpacity
        disabled={loading}
        onPress={
          !isAuthenticated
            ? redirectToLogin
            : paymentMethod === "COD"
            ? () => codHandler()
            : onlineHandler
        }
      >
        <Button
          loading={loading}
          disabled={loading}
          style={localStyles.btn}
          textColor={colors.color2}
          icon={
            paymentMethod === "COD" ? "check-circle" : "circle-multiple-outline"
          }
        >
          {paymentMethod === "COD" ? "Place Order" : "Pay"}
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    marginVertical: 20,
    flex: 1,
    justifyContent: "center",
  },

  radioStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  radioStyleText: {
    fontWeight: "600" as any,
    fontSize: 18,
    textTransform: "uppercase",
    color: colors.color2,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    margin: 10,
    padding: 5,
  },
});

export default Payment;
