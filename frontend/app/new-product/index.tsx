import Header from "@/components/custom/Header";
import Loader from "@/components/custom/Loader";
import SelectComponent from "@/components/custom/SelectComponent";
import { createProduct } from "@/redux/actions/otherActions";
import { AppDispatch } from "@/redux/store";
import {
  colors,
  inputOptions,
  localStyles,
  styles,
} from "@/styles/styles";
import { useMessageAndErrorOther, useSetCategories } from "@/utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import mime from "mime";
import { Image } from "expo-image";
import { getFallbackImageSource } from "@/utils/imageUtils";

export default function NewProduct() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Test");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(false);
  const { imageParam } = useLocalSearchParams();
  const loading = useMessageAndErrorOther(dispatch, "admin");

  
  useSetCategories(setCategories, isFocused);

  const diasableBtn = !name || !description || !price || !stock || !image;;


  useEffect(() => {
    if (imageParam) {
      const imageUri = imageParam as string;
      setImage(imageUri);
    }
  }, [imageParam]);

  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("description", description);
    myForm.append("price", price);
    myForm.append("stock", stock);
    
    const fileData = {
      uri: image,
      type: mime.getType(image) || "image/jpeg",
      name: image.split("/").pop(),
    };
    
    console.log("File data:", fileData);
    myForm.append("file", fileData as any);

    if(categoryId) myForm.append("category", categoryId);

    dispatch(createProduct(myForm));
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
                  <Image
                    style={{ backgroundColor: colors.color1, width: 80, height: 80, borderRadius: 40 }}
                    source={getFallbackImageSource(decodeURIComponent(decodeURIComponent(image as string)))}
                    contentFit="cover"
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
                        updateProfile: "true",
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
              {/* <Button
                onPress={() => router.push(`/product-images/${id}`)}
                textColor={colors.color1}
              >
                Manage Images
              </Button> */}
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
                onPress={submitHandler}
                loading={loading}
                disabled={diasableBtn || loading}
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
