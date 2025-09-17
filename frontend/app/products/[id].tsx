import Header from "@/components/custom/Header";
import { colors, styles } from "@/styles/styles";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { Avatar, Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getProductDetails } from "@/redux/actions/productActions";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

const iconOptions = {
  borderRadius: 5,
  backgroundColor: colors.color5,
  height: 25,
  width: 25,
};

// const images = [
//   {
//     id: "1",
//     url: "https://picsum.photos/400/300",
//   },
//   {
//     id: "2",
//     url: "https://picsum.photos/401/300",
//   },
// ];

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // const product: ProductType = productData.find((x) => x._id === id)!;

  const [quantity, setQuantity] = useState(0);
  const progress = useSharedValue(0);
  const isCarousel = useRef(null);

  const addToCardHandler = (stock: number) => {
    if(stock === 0) return Toast.show({
        type: "error",
        text1: "Out Of Stock",
        text2: ""
    });
    Toast.show({
        type: "success",
        text1: "Added To Cart"
    })
  };

  const increment = (stock: number) => {
    if(stock <= quantity) return Toast.show({
        type: "error",
        text1: "Out Of Stock",
        text2: ""
    });
    if (stock > quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();

  const {product, loading} = useSelector((state: RootState) => state.product);


  useEffect(()=>{
    dispatch(getProductDetails(id));
  },[isFocused, id, dispatch])

  return (
    <View
      style={{
        ...styles.defaultStyle,
        padding: 0,
        backgroundColor: colors.color1,
      }}
    >
      <Header back={true} emptyCart={false} />
      <Carousel
        ref={isCarousel}
        width={SLIDER_WIDTH}
        height={300}
        data={product.images}
        onProgressChange={progress}
        style={{ margin: "auto", width: "90%", marginTop: 80, height: 300 }}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: (item as { url: string }).url }}
              style={{
                width: ITEM_WIDTH,
                height: 300,
                resizeMode: "contain",
              }}
            />
          </View>
        )}
      />
      <View
        style={{
          backgroundColor: colors.color2,
          padding: 35,
          flex: 1,
          marginTop: 30,
          borderTopLeftRadius: 55,
          borderTopRightRadius: 55,
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            fontSize: 25,
          }}
        >
          {product?.name}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            fontSize: 25,
            fontWeight: 700,
          }}
        >
          ${product?.price}
        </Text>
        <Text
          style={{
            fontSize: 15,
          }}
        >
          {product?.description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 5,
            paddingTop: 5,
          }}
        >
          <Text
            style={{
              color: colors.color3,
              fontWeight: 100,
            }}
          >
            Quantity
          </Text>
          <View
            style={{
              width: 80,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => decrement()}>
              <Avatar.Icon
                icon={"minus"}
                size={20}
                style={{
                  ...iconOptions,
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                backgroundColor: colors.color4,
                height: 25,
                width: 25,
                textAlign: "center",
              }}
            >
              {quantity}
            </Text>
            <TouchableOpacity onPress={() => increment(product.stock)}>
              <Avatar.Icon
                icon={"plus"}
                size={20}
                style={{
                  ...iconOptions,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.9} onPress={() => addToCardHandler(product.stock)}>
          <Button
            textColor={colors.color2}
            style={{
              backgroundColor: colors.color3,
              borderRadius: 100,
              padding: 5,
              marginVertical: 35,
            }}
          >
            Add To Cart
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}
