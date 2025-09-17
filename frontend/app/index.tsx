import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import Heading from "@/components/custom/Heading";
import ProductCard from "@/app/products/ProductCard";
import SearchModal from "@/components/custom/SearchModal";
import { ThemedView } from "@/components/ThemedView";
import { colors, styles } from "@/styles/styles";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "@/redux/actions/userActions";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllProducts } from "@/redux/actions/productActions";
import { useIsFocused } from "@react-navigation/native";
import { useSetCategories } from "@/utils/hooks";
import Toast from "react-native-toast-message";



export default function Home() {
  // const categories = [
  //   {
  //     name: "All",
  //     _id: "all",
  //   },
  //   {
  //     name: "Electronics",
  //     _id: "electronics",
  //   },
  //   {
  //     name: "Clothing",
  //     _id: "clothing",
  //   },
  //   {
  //     name: "Books",
  //     _id: "books",
  //   },
  //   {
  //     name: "Toys",
  //     _id: "toys",
  //   },
  // ];

  const [categories, setCategories] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {isAuthenticated, loading} = useSelector((state: RootState) => state.user);
  const {products, loading: productLoading} = useSelector((state: RootState) => state.product);
  const categoryButtonHandler = (id: string) => {
    setCategory(id);
  };

  const addToCardHandler = (id: number, name: string, price: number, image: string, stock: number) => {
    if(stock === 0) return Toast.show({
      type:"error",
      text1:"Out of stock.",
    });
    dispatch({
      type:"addToCart",
      payload:{
        product: id,
        name, 
        price, 
        image, 
        stock,
        quantity: 1
      }
    });

    Toast.show({
      type:"error",
      text1:"Added to cart.",
    });
  };

  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  useSetCategories(setCategories, isFocused);

  useEffect(()=>{
    if(!loading && !isAuthenticated){
      setTimeout(()=>{
        router.push("/login");
      },100)
    }else{
      dispatch(loadUser());
    }
    dispatch(getAllProducts("",""));
  },[])

  useEffect(()=>{
    const timeOut = setTimeout(()=>{
      dispatch(getAllProducts(searchQuery, category));
    },300)
    return () => clearTimeout(timeOut);
  },[searchQuery, category, isFocused,dispatch])

  return (
    <>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}
      <ThemedView style={[styles.defaultStyle, { flex: 1 }]}>
        <Header back={false} emptyCart={false} />

        <View
          style={{
            paddingTop: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Heading
            containerStyle={{
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: 30,
            }}
          />

          <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
            <Avatar.Icon
              icon={"magnify"}
              size={50}
              color={"gray"}
              style={{
                backgroundColor: colors.color2,
                elevation: 12,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 80,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {categories.map((item, index) => {
              return (
                <Button
                  key={index}
                  style={{
                    backgroundColor:
                      category === item._id ? colors.color1 : colors.color5,
                    borderRadius: 100,
                    margin: 5,
                  }}
                  onPress={() => categoryButtonHandler(item._id)}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: category === item._id ? colors.color2 : "gray",
                    }}
                  >
                    {item.category}
                  </Text>
                </Button>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, index) => (
              <ProductCard
                key={index}
                stock={item.stock}
                name={item.name}
                price={item.price}
                image={item.images[0]?.url}
                addToCardHandler={addToCardHandler}
                id={item._id}
                index={index}
              />
            ))}
          </ScrollView>
        </View>
      </ThemedView>
      <Footer />
    </>
  );
}
