import { colors, styles } from "@/styles/styles";
import { CameraType } from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraView } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { RelativePathString, router, useLocalSearchParams } from "expo-router";

export default function CameraComponent() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef<CameraView>(null);
  const { alias, id } = useLocalSearchParams();

  // centralizovana navigacija
  const navigateByAlias = (imageUri: string) => {
    switch (alias) {
      case "newProduct":
        router.replace({ pathname: "/new-product", params: { imageParam: imageUri } });
        break;
      case "updateProduct":
        router.replace({
          pathname: `/product-images/${id}` as RelativePathString,
          params: { id: id as string, imageParam: imageUri },
        });
        break;
      case "updateProfile":
        router.replace({ pathname: "/profile", params: { imageParam: imageUri } });
        break;
      default:
        router.replace({ pathname: "/signup", params: { imageParam: imageUri } });
        break;
    }
  };

  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) return alert("Permission to access gallery required");

    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (data.assets && data.assets.length > 0 && alias) {
      // trajno kopiranje iz galerije u app folder
      const pickedUri = data.assets[0].uri;
      const newPath = FileSystem.documentDirectory + `picked_${Date.now()}.jpg`;
      await FileSystem.copyAsync({ from: pickedUri, to: newPath });
      navigateByAlias(newPath);
    }
  };

  useEffect(() => {
    const checkCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    checkCameraPermission();
  }, []);

  const clickPicture = async () => {
    const data = await cameraRef.current?.takePictureAsync({
      quality: 0.8,
      base64: true,
      skipProcessing: true,
    });

    if (data && alias) {
      const newPath = FileSystem.documentDirectory + `photo_${Date.now()}.jpg`;
      await FileSystem.copyAsync({ from: data.uri, to: newPath });
      console.log("Saved to:", newPath);
      navigateByAlias(newPath);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.defaultStyle}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.defaultStyle}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1, aspectRatio: 1 }}
        ref={cameraRef}
        facing={type}
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
          handler={() =>
            setType((prev) =>
              prev === CameraType.back ? CameraType.front : CameraType.back
            )
          }
        />
      </View>
    </View>
  );
}

const MyIcon = ({ icon, handler }: { icon: string; handler: () => void }) => (
  <TouchableOpacity onPress={handler}>
    <Avatar.Icon
      icon={icon}
      size={40}
      style={{ backgroundColor: colors.color1 }}
    />
  </TouchableOpacity>
);
