import { colors } from "@/styles/styles";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MyModal from "./MyModal";

type ProductListItemProps = {
  i: number;
  id: string;
  price: number;
  stock: number;
  name: string;
  category: string;
  imgSrc: string;
  navigate: (id: string) => void;
  deleteProduct: (id: string) => void;
};

export default function ProductListItem({
  i,
  id,
  price,
  stock,
  name,
  category,
  imgSrc,
  navigate,
  deleteProduct,
}: ProductListItemProps) {


    const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={()=> setOpenModal(!openModal)}
        onPress={() => router.push(`/products/${id}`)}
      >
        <View
          style={{
            ...ProductStyles.container,
            backgroundColor: i % 2 === 0 ? colors.color1 : colors.color3,
          }}
        >
          <Image
  source={
    imgSrc && imgSrc.length > 0
      ? { uri: imgSrc }            // remote ili file URI
      : require("../../assets/images/fallback.png") // lokalna statička slika
  }
  style={{
    width: 40,
    height: 40,
    resizeMode: "contain",
  }}
/>

          <Text
            style={{
              width: 60,
              color: colors.color2,
            }}
            numberOfLines={1}
          >
            ${price}
          </Text>
          <Text
            style={{
              width: 60,
              color: colors.color2,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text
            style={{
              width: 60,
              color: colors.color2,
            }}
            numberOfLines={1}
          >
            {category}
          </Text>
          <Text style={{
                width: 40,
                color: colors.color2,
            }}
                numberOfLines={1}
            >{stock}</Text>
        </View>
      </TouchableOpacity>
      {openModal && (
        <MyModal id={id} deleteHandler={deleteProduct} navigate={navigate} setOpenModal={setOpenModal}/>
      )}
    </>
  );
}

const ProductStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});
