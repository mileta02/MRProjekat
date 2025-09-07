import { Image } from "expo-image";
import { Text, View } from "react-native";

type OrderItemProps = {
  price: number;
  image: string;
  name: string;
  quantity: number;
};

export default function OrderItem({
  price,
  image,
  name,
  quantity,
}: OrderItemProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
      }}
    >
      <Image
        source={{ uri: image }}
        style={{ width: 50, height: 50, resizeMode: "contain" }}
      />

      <Text>{name}</Text>
      <View style = {{
        flexDirection: "row"
      }}>
        <Text>{quantity}</Text>
        <Text style = {{marginHorizontal: 10}}>x</Text>
        <Text>${price}</Text>
      </View>
    </View>
  );
}
