import { colors } from "@/styles/styles";
import { useNavigation } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { NavigationProp } from "./SearchModal";

type FooterProps = {
  activeRoute?: string;
};

export default function Footer({ activeRoute = "home" }: FooterProps) {
  const navigate = useNavigation<NavigationProp>();

  const isAuthenticated = false;
  const loading = false;

  const navigationHandler = (key: number) => {
    switch (key) {
      case 0:
        navigate.navigate("home");
        break;
      case 1:
        navigate.navigate("cart");
        break;
      case 2:
        if (isAuthenticated) navigate.navigate("profile");
        else navigate.navigate("login");
        break;
      default:
        navigate.navigate("home");
        break;
    }
  };

  const avatarOption = {
    color: colors.color2,
    size: 50,
    style: {
      backgroundColor: colors.color1,
    },
  };

  return (
    loading === false && (
        <View
      style={{
        backgroundColor: colors.color1,
        borderTopRightRadius: 120,
        borderTopLeftRadius: 120,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigationHandler(2)}
        >
          <Avatar.Icon
            {...avatarOption}
            icon={activeRoute == "cart" ? "shopping" : "shopping-outline"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigationHandler(2)}
        >
          <Avatar.Icon
            {...avatarOption}
            icon={activeRoute == "profile" ? "account" : "account-outline"}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          width: 80,
          height: 80,
          backgroundColor: colors.color2,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          top: -50,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigationHandler(0)}
        >
          <Avatar.Icon
            {...avatarOption}
            icon={activeRoute === "home" ? "home" : "home_outline"}
          />
        </TouchableOpacity>
      </View>
    </View>
    )
  );
}
