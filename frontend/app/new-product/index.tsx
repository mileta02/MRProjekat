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
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";

export default function NewProduct() {
  const loading = false;
  const id: string = "";
  const [image, setImage] = useState<string>("");
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

  const { imageParam } = useLocalSearchParams();

  const loadingOther = false;
  const submitHandler = () => {};

  useEffect(() => {
    if (imageParam) setImage(imageParam as string);
  }, [imageParam]);

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
          <Text style={localStyles.heading}>New Product</Text>
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
              <View
                style={{
                  width: 80,
                  height: 80,
                  alignSelf: "center",
                  marginBottom: 20,
                }}
              >
                {image ? (
                  <Avatar.Image
                    size={80}
                    style={{ backgroundColor: colors.color1 }}
                    source={{ uri: image }}
                  />
                ) : (
                  <Avatar.Icon
                    icon="image"
                    size={80}
                    style={{ backgroundColor: colors.color2 }}
                  />
                )}
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/camera",
                      params: {
                        alias: "newProduct",
                      },
                    })
                  }
                >
                  <Avatar.Icon
                    icon={"camera"}
                    size={30}
                    color={colors.color3}
                    style={{
                      backgroundColor: colors.color2,
                      position: "absolute",
                      bottom: 0,
                    }}
                  />
                </TouchableOpacity>
              </View>
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
                placeholder="Price"
                keyboardType="number-pad"
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
                loading={loading}
                disabled={loading}
              >
                Create
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
