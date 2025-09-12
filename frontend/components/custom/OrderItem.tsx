import { colors } from "@/styles/styles";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

type OrderItemProps = {
  id: string;
  price: number;
  address: string;
  orderedOn: string;
  status: string;
  paymentMethod: string;
  updateHandler: (id: string) => void;
  admin?: boolean;
  loading?: boolean;
  i?: number;
};

const TextBox = ({
  title,
  value,
  i,
}: {
  title: string;
  value: string;
  i: number;
}) => {
  return (
    <Text
      style={{
        marginVertical: 6,
        color: i % 2 === 0 ? colors.color3 : colors.color2,
      }}
    >
      <Text style={{ fontWeight: 900 }}>{title} - </Text>
      {title === "Price" ? "$" : ""}
      <Text>{value}</Text>
    </Text>
  );
};

export default function OrderItem({
  id,
  price,
  address,
  orderedOn,
  status,
  paymentMethod,
  updateHandler,
  admin = false,
  loading,
  i = 0,
}: OrderItemProps) {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3,
      }}
    >
      <Text
        style={{
          ...styles.text,
          backgroundColor: i % 2 === 0 ? colors.color3 : colors.color1,
        }}
      >
        ID - #{id}
      </Text>
      <TextBox title={"Address"} value={address} i={i} />
      <TextBox title={"Ordered On"} value={orderedOn} i={i} />
      <TextBox title={"Price"} value={price.toString()} i={i} />
      <TextBox title={"Status"} value={status} i={i} />
      <TextBox title={"Payment Method"} value={paymentMethod} i={i} />
      {admin && (
        <Button
          icon={"update"}
          mode={"contained"}
          style={{
            width: 120,
            alignSelf: "center",
            marginTop: 10,
            backgroundColor: i % 2 === 0 ? colors.color3 : colors.color2
          }}
          onPress={()=> updateHandler(id)}
          loading={loading}
          disabled={loading}
          textColor={i % 2 === 0 ? colors.color2 : colors.color3}
        >
          Update
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  text: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: 500,
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
