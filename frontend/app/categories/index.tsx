import Header from "@/components/custom/Header";
import { addCategory, deleteCategory } from "@/redux/actions/otherActions";
import { AppDispatch } from "@/redux/store";
import { colors, inputOptions, localStyles, styles } from "@/styles/styles";
import { useMessageAndErrorOther, useSetCategories } from "@/utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";

// const categories = [
//   {
//     name: "Laptop",
//     id: "123",
//   },
//   {
//     name: "Phone",
//     id: "234",
//   },
//   {
//     name: "Car",
//     id: "345",
//   },
// ];

export default function Categories() {
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  useSetCategories(setCategories, isFocused);

  const loading = useMessageAndErrorOther(dispatch, "admin");

  const deleteHandler = (id: string) => {
    dispatch(deleteCategory(id));
  };

  const submitHandler = () => {
    dispatch(addCategory(category));
    setCategory("");
  };

  return (
    <>
      <Header back={true} emptyCart={false} />

      <View style={{ ...styles.defaultStyle, backgroundColor: colors.color5 }}>
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={localStyles.heading}>Categories</Text>
        </View>
        <ScrollView
          style={{
            marginBottom: 20,
          }}
        >
          <View
            style={{
              backgroundColor: colors.color2,
              padding: 20,
              minHeight: 400,
            }}
          >
            {categories.map((i, index) => (
              <CategoryCard
                name={i.category}
                id={i._id}
                key={i._id}
                deleteHandler={deleteHandler}
              />
            ))}
          </View>
        </ScrollView>
        <View style={categoryStyles.container}>
          <TextInput
            {...inputOptions}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
            mode="outlined"
          />
          <Button
            textColor={colors.color2}
            style={{
              backgroundColor: colors.color1,
              margin: 20,
              padding: 6,
            }}
            loading={loading}
            disabled={!category}
            onPress={()=>submitHandler()}
          >
            Add
          </Button>
        </View>
      </View>
    </>
  );
}

const CategoryCard = ({
  name,
  id,
  deleteHandler,
}: {
  name: string;
  id: string;
  deleteHandler: (id: string) => void;
}) => (
  <View style={categoryStyles.cardContainer}>
    <Text style={categoryStyles.text}>{name}</Text>
    <TouchableOpacity onPress={() => deleteHandler(id)}>
      <Avatar.Icon
        icon={"delete"}
        size={30}
        style={{
          backgroundColor: colors.color1,
        }}
      />
    </TouchableOpacity>
  </View>
);

const categoryStyles = StyleSheet.create({
  container: {
    padding: 20,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: colors.color3,
  },

  cardContainer: {
    backgroundColor: colors.color2,
    elevation: 5,
    margin: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
