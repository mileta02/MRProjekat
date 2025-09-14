import Header from "@/components/custom/Header";
import Loader from "@/components/custom/Loader";
import SelectComponent from "@/components/custom/SelectComponent";
import {
  colors,
  inputOptions,
  inputStyling,
  localStyles,
  styles,
} from "@/styles/styles";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function UpdateProduct(id: string) {
  const loading = false;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Test");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([
    {
      _id: "1",
      category: "Laptop",
    },
    {
      _id: "2",
      category: "Phone",
    },
    {
      _id: "3",
      category: "Car",
    },
  ]);
  const [visible, setVisible] = useState(false);

  const loadingOther = false;
  const submitHandler = () => {

  };

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
          <Text style={localStyles.heading}>Update Product</Text>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            style={{
              padding: 20,
              elevation: 10,
              borderRadius: 10,
              backgroundColor: colors.color3,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                height: 650,
              }}
            >
              <Button
                onPress={() => router.push(`/product-images/${id}`)}
                textColor={colors.color1}
              >
                Manage Images
              </Button>
              <TextInput
                style={{ ...inputOptions }}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={{ ...inputOptions }}
                placeholder="Descriptiom"
                value={description}
                onChangeText={setDescription}
              />
              <TextInput
                style={{ ...inputOptions }}
                keyboardType="number-pad"
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
              />
              <TextInput
                style={{ ...inputOptions }}
                placeholder="Stock"
                value={stock}
                onChangeText={setStock}
              />
              <Text
                style={{
                  ...styles.inputsStyling,
                  borderRadius: 3,
                  marginHorizontal: 20,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
                onPress={() => setVisible(true)}
              >
                {category}
              </Text>
              <Button
                textColor={colors.color2}
                style={{
                  backgroundColor: colors.color1,
                  margin: 20,
                  padding: 6,
                }}
                onPress={() => submitHandler}
                loading={loadingOther}
                disabled={loadingOther}
              >
                Update
              </Button>
            </View>
          </ScrollView>
        )}
      </View>
      <SelectComponent
        visible={visible}
        setVisible={setVisible}
        setCategory={setCategory}
        setCategoryId={setCategoryId}
        categories={categories}
      />
    </>
  );
}
