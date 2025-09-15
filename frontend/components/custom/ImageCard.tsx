import { colors } from "@/styles/styles";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";

type ImageCardProps = {
  src: string;
  id: string;
  deleteHandler: (id: string) => void;
};

export default function ImageCard(props: ImageCardProps) {
  return (
    <View style={imageCardStyles.container}>
      <Image
        source={{
          uri: props.src,
        }}
        style={{
          width: "100%",
          height: "80%",
          resizeMode: "contain",
        }}
      />
      <TouchableOpacity onPress={()=> props.deleteHandler(props.id)}>
        <Avatar.Icon
          size={30}
          icon={"delete"}
          style={{
            backgroundColor: colors.color1,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const imageCardStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.color2,
    elevation: 10,
    margin: 10,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    height: 300,
  },
});