import { colors } from "@/styles/styles";
import { router, useNavigation } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

type FooterProps = {
  activeRoute?: string;
};

export default function Footer({ activeRoute = "home" }: FooterProps) {
  const isAuthenticated = true;
  const loading = false;

  const navigationHandler = (key: number) => {
    switch (key) {
      case 0:
        router.push("/");
        break;
      case 1:
        router.push("/cart");
        break;
      case 2:
        if (isAuthenticated) router.push("/profile");
        else router.push("/login");
        break;
      default:
        router.push("/");
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
              icon={
                !isAuthenticated
                  ? "login"
                  : activeRoute == "profile"
                  ? "account "
                  : "account-outline"
              }
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
              icon={activeRoute === "home" ? "home" : "home-outline"}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  );
}
