import ButtonBox from "@/components/custom/ButtonBox";
import Chart from "@/components/custom/Chart";
import Header from "@/components/custom/Header";
import Loader from "@/components/custom/Loader";
import ProductListItem from "@/components/custom/ProductListItem";
import { AppDispatch } from "@/redux/store";
import { colors, localStyles, styles } from "@/styles/styles";
import { productData } from "@/types/types";
import { useAdminProducts } from "@/utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

const ProductListHeading = () => {
  return (
    <View style={adminStyles.container}>
      <Text style={adminStyles.text}>Image</Text>
      <Text style={adminStyles.text}>Price</Text>
      <Text style={{ ...adminStyles.text, width: null, maxWidth: 120 }}>
        Name
      </Text>
      <Text style={{ ...adminStyles.text, width: 60 }}>Category</Text>
      <Text style={adminStyles.text}>Stock</Text>
    </View>
  );
};

const adminStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.color3,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
  text: {
    width: 40,
    color: colors.color2,
    fontWeight: 900,
  },
});

export default function Admin() {
  const navigationHandler = (text: string) => {
    switch (text) {
      case "Product":
        router.push("/new-product");
        break;
      case "All Orders":
        router.push("/admin-orders");
        break;
      case "Category":
        router.push("/new-product");
        break;
      default:
        router.push("/admin-orders");
        break;
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const { products, inStock, outOfStock, loading } = useAdminProducts(dispatch, isFocused);

  const productNavigate = (id: string) => {
    router.push(`/products/${id}`)
  }

  const deleteHandler = () => {};

  return (
    <>
      <Header back={true} emptyCart={false} />
      <View style={{ ...styles.defaultStyle }}>
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={localStyles.heading}>Admin Panel</Text>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View
              style={{
                backgroundColor: colors.color3,
                borderRadius: 20,
                alignItems: "center",
              }}
            >
              <Chart inStock={12} outOfStock={2} />
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 20,
                  justifyContent: "space-between",
                }}
              >
                <ButtonBox
                  icon={"plus"}
                  text={"Product"}
                  handler={navigationHandler}
                />
                <ButtonBox
                  icon={"format-list-bulleted-square"}
                  text={"All Orders"}
                  handler={navigationHandler}
                  reverse={true}
                />
                <ButtonBox
                  icon={"plus"}
                  text={"Category"}
                  handler={navigationHandler}
                />
              </View>
            </View>
            <ProductListHeading />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                {productData.map((item, index) => (
                  <ProductListItem
                    key={item._id}
                    i={index}
                    id={item._id}
                    price={item.price}
                    stock={item.stock}
                    name={item.name}
                    category={item.category}
                    imgSrc={item.images[0].url}
                    navigate={() => productNavigate(item._id)}
                    deleteProduct={deleteHandler}
                  />
                ))}
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </>
  );
}
