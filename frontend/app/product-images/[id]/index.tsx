import Header from "@/components/custom/Header";
import ImageCard from "@/components/custom/ImageCard";
import { colors, localStyles, styles } from "@/styles/styles";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Button } from "react-native-paper";

export default function ProductImages() {
  const loading: boolean = false;
  const { productId } = useLocalSearchParams();
  //   const { images } = useLocalSearchParams();
  //   const parsedImages = images
  //     ? JSON.parse(decodeURIComponent(images as string))
  //     : [];

  const images = [
    {
      url: "https://picsum.photos/400/300",
      _id: "123"
    },
    {
      url: "https://picsum.photos/401/300",
      _id: "124"
    },
    {
      url: "https://picsum.photos/402/300",
      _id: "125"
    },
  ];

  const [image, setImage] = useState("");
  const [imageChanged, setImageChanged] = useState(false);

  const submitHandler = () => {};

  const deleteHandler = (id: string) => {};

  type ImageType = {
    _id: string;
    url: string;
  };
  const { imageParam } = useLocalSearchParams();

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
            {images.map((i: ImageType) => (
              <ImageCard
                key={i._id}
                src={i.url}
                id={i._id}
                deleteHandler={deleteHandler}
              />
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            padding: 20,
            borderRadius: 10,
            backgroundColor: colors.color3,
          }}
        >
          <Image
            style={{
              backgroundColor: colors.color2,
              width: 100,
              height: 100,
              alignSelf: "center",
              resizeMode: "contain",
            }}
            source={{ uri: undefined }}
          />
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
