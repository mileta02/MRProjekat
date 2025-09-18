import Header from "@/components/custom/Header";
import Loader from "@/components/custom/Loader";
import SelectComponent from "@/components/custom/SelectComponent";
import { updateProduct } from "@/redux/actions/otherActions";
import { getProductDetails } from "@/redux/actions/productActions";
import { AppDispatch, RootState } from "@/redux/store";
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
import { ScrollView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateProduct() {
  const { id } = useLocalSearchParams();
  const productId = id as string;

  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [category, setCategory] = useState("Test");
  const [categoryId, setCategoryId] = useState("");
  const [visible, setVisible] = useState(false);

  const {product, loading} = useSelector((state: RootState) => state.product);
  useSetCategories(setCategories, isFocused);

  const submitHandler = () => {
    dispatch(updateProduct(productId, name, description, price, stock, categoryId));
  };

  const loadingOther = useMessageAndErrorOther(dispatch, "admin");

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetails(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if(product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setCategory(product.category);
      setCategoryId(product.categoryId);
    }
  }, [product]);

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
                onPress={() =>
                  router.push({
                    pathname: "/product-images/[id]",
                    params: {
                      id: productId,
                      images: encodeURIComponent(
                        JSON.stringify(product?.images ?? [])
                      ),
                    },
                  })
                }
                style={{
                  margin: 20,
                  padding: 6,
                  borderColor: colors.color1,
                  borderWidth: 1,
                }}
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
              value={price.toString()}
                onChangeText={(text) => setPrice(Number(text))}
              />
              <TextInput
                style={{ ...inputOptions }}
                placeholder="Stock"
                value={stock.toString()}
                onChangeText={(text) => setStock(Number(text))}
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
