import Header from "@/components/custom/Header";
import Loader from "@/components/custom/Loader";
import OrderItem from "@/components/custom/OrderItem";
import { colors, localStyles, styles } from "@/styles/styles";
import { useGetOrders } from "@/utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import { Headline } from "react-native-paper";
import { OrderType } from "../admin-orders";

// export const orders = [
//     {
//       _id: "Sample",
//       shippingInfo: {
//         address: "Sample 12",
//         city: "Belgrade",
//         country: "Serbia",
//         pinCode: 12345,
//       },
//       createdAt: "12-12-2022",
//       orderStatus: "Processing",
//       paymentMethod: "COD",
//       totalAmount: 2000,
//     },
//     {
//       _id: "Sample 2",
//       shippingInfo: {
//         address: "Sample 12",
//         city: "Belgrade",
//         country: "Serbia",
//         pinCode: 12345,
//       },
//       createdAt: "12-12-2022",
//       orderStatus: "Processing",
//       paymentMethod: "COD",
//       totalAmount: 2000,
//     },
//     {
//       _id: "Sample 3",
//       shippingInfo: {
//         address: "Sample 12",
//         city: "Belgrade",
//         country: "Serbia",
//         pinCode: 12345,
//       },
//       createdAt: "12-12-2022",
//       orderStatus: "Processing",
//       paymentMethod: "COD",
//       totalAmount: 2000,
//     },
//   ];

export default function Orders() {
  const handler = () => {};
  const isFocused = useIsFocused();
  const {orders, loading} = useGetOrders(isFocused) as {orders: OrderType[], loading: boolean};
  console.log(orders);

  return (
    <>
      <Header back={true} emptyCart={false} />

      <View
        style={{
          ...styles.defaultStyle,
          backgroundColor: colors.color5,
        }}
      >
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={localStyles.heading}>Orders</Text>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <View
            style={{
              padding: 10,
              flex: 1,
            }}
          >
            <ScrollView>
              {orders.length > 0 ? (
                orders.map((item, index) => (
                  <OrderItem
                    key={item._id}
                    id={item._id}
                    i={index}
                    price={item.totalAmount}
                    status={item.orderStatus}
                    paymentMethod={item.paymentMethod}
                    orderedOn={item.createdAt.split("T")[0]}
                    address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country}, ${item.shippingInfo.pinCode}`}
                    updateHandler={handler}
                    // admin = {true}
                    // loading={false}
                  />
                ))
              ) : (
                <Headline>No Orders Yet</Headline>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </>
  );
}
