import { colors } from "@/styles/styles";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";

type CartItemProps = {
  index: number;
  id: string;
  name: string;
  stock: number;
  price: number;
  image: string;
  quantity: number;
  incrementHandler: (id: string, quantity: number, stock: number) => void;
  decrementHandler: (id: string, quantity: number, stock: number) => void;
};

export default function CartItem({
  index,
  id,
  name,
  stock,
  price,
  image,
  quantity,
  incrementHandler,
  decrementHandler,
}: CartItemProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 20,
      }}
    >
      <View
        style={{
          width: "40%",
          height: 100,
          backgroundColor: index % 2 === 0 ? colors.color1 : colors.color3,
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
        }}
      >
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: 150,
            height: "100%",
            resizeMode: "contain",
            top: "-20%",
            left: "20%",
          }}
        />
      </View>
      <View
        style={{
          width: "40%",
          paddingHorizontal: 45,
        }}
      >
        <Text numberOfLines={1} style={{ fontSize: 17 }}>
          {name}
        </Text>
        <Text numberOfLines={1} style={{ fontSize: 17, fontWeight: "900" }}>
          ${price}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          width: "20%",
          height: 80,
          justifyContent: "space-between",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity onPress={() => incrementHandler(id, quantity, stock)}>
          <Avatar.Icon
            icon={"plus"}
            size={20}
            style={{
              borderRadius: 5,
              backgroundColor: colors.color5,
              height: 25,
              width: 25,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            backgroundColor: colors.color4,
            height: 25,
            width: 25,
            textAlignVertical: "center",
            textAlign: "center",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: colors.color5,
          }}
        >
          {quantity}
        </Text>
        <TouchableOpacity onPress={() => decrementHandler(id, quantity, stock)}>
          <Avatar.Icon
            icon={"minus"}
            size={20}
            style={{
              borderRadius: 5,
              backgroundColor: colors.color5,
              height: 25,
              width: 25,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
