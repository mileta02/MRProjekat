import { colors } from "@/styles/styles";
import { ProductType, RootStackParamList } from "@/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  BackHandler,
  NativeSyntheticEvent,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { Headline, Searchbar } from "react-native-paper";
type SearchModalProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setActiveSearch: (value: boolean) => void;
  products: ProductType[];
};

type SearchItemProps = {
  price: number;
  name: string;
  imgSrc: string;
  handler: () => void;
};

const SearchItem = ({ price, name, imgSrc, handler }: SearchItemProps) => (
  <TouchableOpacity onPress={handler}>
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.color2,
        elevation: 5,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        marginVertical: 30,
      }}
    >
      <Image
        source={{
          uri: imgSrc,
        }}
        style={{
          width: 80,
          height: 80,
          position: "absolute",
          resizeMode: "contain",
          top: -15,
          left: 10,
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />
      <View
        style={{
          width: "80%",
          paddingHorizontal: 30,
        }}
      >
        <Text numberOfLines={1}>{name}</Text>
        <Headline style={{ fontWeight: "900" }} numberOfLines={1}>
          ${price}
        </Headline>
      </View>
    </View>
  </TouchableOpacity>
);

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SearchModal({
  searchQuery,
  setSearchQuery,
  setActiveSearch,
  products,
}: SearchModalProps) {
  const navigate = useNavigation<NavigationProp>();

  const backAction = () => {
    setSearchQuery("");
    setActiveSearch(false);
    return true;
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => subscription.remove();
  }, []);

  const router = useRouter();

  return (
    <View
      style={{
        width: "100%",
        height: "90%",
        position: "absolute",
        top: 0,
        zIndex: 100,
        backgroundColor: colors.color2,
        padding: 35,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <SafeAreaView>
        <Searchbar
          placeholder="Search..."
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={{
            marginTop: 20,
          }}
        />
        <ScrollView>
          <View
            style={{
              paddingVertical: 40,
              paddingHorizontal: 10,
            }}
          >
                        {products
              .filter((product) => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((i) => (
              <SearchItem
                key={i._id}
                imgSrc={i.images[0]?.url}
                name={i.name}
                price={i.price}
                handler={() =>
                  router.push(`/products/${i._id}`)
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
