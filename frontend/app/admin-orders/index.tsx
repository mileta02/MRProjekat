import Header from "@/components/custom/Header";
import Loader from "@/components/custom/Loader";
import { colors, localStyles, styles } from "@/styles/styles";
import { ScrollView, Text, View } from "react-native";
import { orders } from "../orders";
import OrderItem from "@/components/custom/OrderItem";
import { Headline } from "react-native-paper";

export default function AdminOrders() {

    const loading = false;
    const processOrderLoading = false;
    const updateHandler = () => {

    }

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
          <Text style={localStyles.heading}>All Orders</Text>
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
                    updateHandler={updateHandler}
                    admin = {true}
                    loading={processOrderLoading}
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
