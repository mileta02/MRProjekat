import { colors, styles } from "@/styles/styles";
import { CameraType } from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraView } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";

export default function CameraComponent() {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef<CameraView>(null);
  const { alias, id } = useLocalSearchParams();

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false)
      return alert("Permission to access gallery required");

    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (data.assets && data.assets.length > 0 && alias) {
      const imageUri = data.assets[0].uri;
      switch (alias) {
        case "newProduct":
          router.push({
            pathname: "/new-product",
            params: { imageParam: imageUri },
          });
          break;

        case "updateProduct":
          router.push({
            pathname: "/product-images/[id]",
            params: { id: id as string, imageParam: imageUri },
          });
          break;

        case "updateProfile":
          router.push({
            pathname: "/profile",
            params: { imageParam: imageUri },
          });
          break;

        default:
          router.push({
            pathname: "/signup",
            params: { imageParam: imageUri },
          });
          break;
      }
    }
  };

  useEffect(() => {
    async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      if (hasPermission === null) return <></>;
      if (hasPermission === false)
        return (
          <View style={styles.defaultStyle}>
            <Text>No access for camera</Text>
          </View>
        );
    };
  }, []);

  const clickPicture = async () => {
    const data = await cameraRef.current?.takePictureAsync({
      quality: 0.8,
      base64: false,
      skipProcessing: true,
    });
    if (data && alias) {
      const imageUri = data.uri;
      if (alias === "newProduct") {
        router.push({
          pathname: "/new-product",
          params: {
            imageParam: imageUri,
          },
        });
      }
      if (alias === "updateProduct") {
        router.push({
          pathname: "/product-images/[id]",
          params: {
            id: id as string,
            imageParam: imageUri,
          },
        });
      }
      if (alias === "updateProfile") {
        router.push({
          pathname: "/profile",
          params: {
            imageParam: imageUri,
          },
        });
      } else {
        router.push({
          pathname: "/signup",
          params: {
            imageParam: imageUri,
          },
        });
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CameraView
        style={{
          flex: 1,
          aspectRatio: 1,
        }}
        ref={cameraRef}
      />
      <View
        style={{
          flexDirection: "row",
          bottom: 10,
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <MyIcon icon="image" handler={openImagePicker} />
        <MyIcon icon="camera" handler={clickPicture} />
        <MyIcon
          icon="camera-flip"
          handler={() => {
            setType((prevType) =>
              prevType === CameraType.back ? CameraType.front : CameraType.back
            );
          }}
        />
      </View>
    </View>
  );
}

const MyIcon = ({ icon, handler }: { icon: string; handler: () => void }) => {
  return (
    <TouchableOpacity onPress={handler}>
      <Avatar.Icon
        icon={icon}
        size={40}
        style={{
          backgroundColor: colors.color1,
        }}
      />
    </TouchableOpacity>
  );
};