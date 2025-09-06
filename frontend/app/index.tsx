import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import ProductCard from "@/components/custom/ProductCard";
import SearchModal, { NavigationProp } from "@/components/custom/SearchModal";
import { ThemedView } from "@/components/ThemedView";
import { colors, styles } from "@/styles/styles";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Avatar, Button } from "react-native-paper";

type ImageType = {
  url: string;
}

export type ProductType = {
  _id: string;
  images: ImageType[];
  name: string;
  price: number;
  stock: number;
}

export default function Home() {
  const categories = [
    {
      name: "All",
      _id: "all",
    },
    {
      name: "Electronics",
      _id: "electronics",
    },
    {
      name: "Clothing",
      _id: "clothing",
    },
    {
      name: "Books",
      _id: "books",
    },
    {
      name: "Toys",
      _id: "toys",
    },
  ];

  const productData: ProductType[] = [
    {
      price: 300,
      name: "Sample",
      _id: "1",
      images: [
        {
          url: "",
        },
      ],
      stock: 4
    },
    {
      price: 500,
      name: "Sample",
      _id: "1",
      images: [
        {
          url: "",
        },
      ],
      stock: 3
    }
  ]


  const [category, setCategory] = useState<string>("all");
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<ProductType[]>(productData);

  const categoryButtonHangler = (id: string) => {
    setCategory(id);
  };

  const addToCardHandler = (id: string) => {

  }

  return (
    <>
      {activeSearch && (
        <SearchModal searchQuery={searchQuery} setSearchQuery={setSearchQuery} setActiveSearch = {setActiveSearch} products = {products}/>
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
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: 30,
            }}
          >
            <Text style={{ fontSize: 25 }}>Our</Text>
            <Text style={{ fontSize: 25, fontWeight: "900" }}>Products</Text>
          </View>

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
                  onPress={() => categoryButtonHangler(item._id)}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: category === item._id ? colors.color2 : "gray",
                    }}
                  >
                    {item.name}
                  </Text>
                </Button>
              );
            })}
          </ScrollView>
        </View>
        <View style = {{flex: 1}}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {products.map((item,index) => (
                  <ProductCard
                    key = {item._id}
                    stock = {item.stock}
                    name = {item.name}
                    price = {item.price}
                    image = {item.images[0]?.url}
                    addToCardHandler={addToCardHandler}
                    id = {item._id}
                    index = {index}
                  />
                ))}
              </ScrollView>
        </View>
      </ThemedView>
      <Footer/>
    </>
  );
}
