import Header from "@/components/custom/Header";
import ImageCard from "@/components/custom/ImageCard";
import { AppDispatch, RootState } from "@/redux/store";
import { colors, localStyles, styles } from "@/styles/styles";
import { useMessageAndErrorOther } from "@/utils/hooks";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import mime from "mime";
import { deleteProductImage, updateProductImage } from "@/redux/actions/otherActions";
import { getFallbackImageSource } from "@/utils/imageUtils";

export default function ProductImages() {

  const {product} = useSelector((state: RootState) => state.product);
  const [images, setImages] = useState<ImageType[]>(product.images);
  const [image, setImage] = useState("");
  const [imageChanged, setImageChanged] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const loading = useMessageAndErrorOther(dispatch, "admin");

  const submitHandler = () => {
    const myForm = new FormData();
    const fileData = {
      uri: image,
      type: mime.getType(image) || "image/jpeg",
      name: image.split("/").pop(),
    };
    myForm.append("file", fileData as any);
    dispatch(updateProductImage(product._id as string, myForm));
  };

  const deleteHandler = (id: string) => {
    dispatch(deleteProductImage(product._id as string, id));
  };

  type ImageType = {
    _id: string;
    url: string;
  };

  const { imageParam } = useLocalSearchParams();

  useEffect(() => {
    if (imageParam) {
      const imageUri = imageParam as string;
      setImage(imageUri);
    }
    setImageChanged(true);
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
          <Text style={localStyles.heading}>Images</Text>
        </View>
        <ScrollView
          style={{
            marginBottom: 20,
          }}
        >
          <View
            style={{
              backgroundColor: colors.color2,
              padding: 40,
              minHeight: 400,
            }}
          >
            {images ? images.map((i: ImageType) => (
              <ImageCard
                key={i._id}
                src={i.url}
                id={i._id}
                deleteHandler={deleteHandler}
              />
            )) : <Avatar.Icon
            icon="image"
            size={80}
            style={{ backgroundColor: colors.color2 }}
          />}
          </View>
        </ScrollView>
        <View
          style={{
            padding: 20,
            borderRadius: 10,
            backgroundColor: colors.color3,
          }}
        >
          {image ? (
                  <Image
                    style={{ backgroundColor: colors.color1, width: 80, height: 80, marginHorizontal: "auto" }}
                    source={getFallbackImageSource(decodeURIComponent(decodeURIComponent(image as string)))}
                    contentFit="cover"
                  />
                ) : (
                  <Avatar.Icon
                    icon="image"
                    size={80}
                    style={{ backgroundColor: colors.color2, marginHorizontal: "auto" }}
                  />
                )}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push({
                pathname: "/camera",
                params: {
                    alias: "updateProduct"
                }
            })}
          >
            <Avatar.Icon
              icon={"camera"}
              size={30}
              style={{
                backgroundColor: colors.color2,
                margin: 10,
                marginHorizontal: "auto"
              }}
              color={colors.color3}
            />
          </TouchableOpacity>
        </View>
        <Button
          style={{
            backgroundColor: colors.color1,
            padding: 6,
          }}
          textColor={colors.color2}
          loading={loading}
          onPress={submitHandler}
          disabled={!imageChanged}
        >
          Add
        </Button>
      </View>
    </>
  );
}