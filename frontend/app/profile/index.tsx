import ButtonBox from "@/components/custom/ButtonBox";
import Footer from "@/components/custom/Footer";
import Loader from "@/components/custom/Loader";
import { loadUser, logout } from "@/redux/actions/userActions";
import { AppDispatch } from "@/redux/store";
import { colors, localStyles, styles } from "@/styles/styles";
import { useMessageAndErrorOther, useMessageErrorUser } from "@/utils/hooks";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import mime, { Mime } from "mime";
import { updatePic } from "@/redux/actions/otherActions";
import { useIsFocused } from "@react-navigation/native";
export default function Profile( {navigation, route} : any) {


  const { user } = useSelector((state:any) => state.user);
  const [avatar, setAvatar] = useState("");

  const isFocused = useIsFocused();

  const dispatch = useDispatch<AppDispatch>();

  const loading = useMessageErrorUser(dispatch, "login");

  const logoutHandler = () => {
    dispatch(logout());
  };

  const navigateHandler = (text: string) => {
    switch (text) {
      case "Admin":
        router.push("/admin");
        break;
      case "Orders":
        router.push("/orders");
        break;
      case "Profile":
        router.push("/update-profile");
        break;
      case "Password":
        router.push("/change-password");
        break;
      case "Sign Out":
        logoutHandler();
        break;
      default:
        break;
    }
  };

  const { imageParam } = useLocalSearchParams();
  const [image, setImage] = useState("");


  const loadingPic = useMessageAndErrorOther(dispatch, null, undefined, loadUser);

  useEffect(() => {
    if (imageParam) {
      setAvatar(imageParam as string);
      // dispatch updatePic Here
      const myForm = new FormData();
      myForm.append("file", {
        uri: imageParam as string,
        type: mime.getType(imageParam as string) || "image/jpeg",
        name: (imageParam as string).split("/").pop(),
      } as any);
      console.log("myForm", myForm);
      dispatch(updatePic(myForm));
    }
  }, [imageParam,dispatch]);


  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    setAvatar(user?.avatar?user.avatar.url : null);
  }, [user]);

  return (
    <>
      <View style={{ ...styles.defaultStyle }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={localStyles.heading}>Profile</Text>
        </View>

        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={profileStyles.container}>
              {avatar ? (
                <Avatar.Image
                  size={80}
                  style={{ backgroundColor: colors.color1 }}
                  source={{ uri: avatar }}
                />
              ) : (
                <Avatar.Icon
                  icon="image"
                  size={80}
                  style={{ backgroundColor: colors.color2 }}
                />
              )}
              <TouchableOpacity
                disabled={loadingPic}
                onPress={() =>
                  router.push({
                    pathname: "/camera",
                    params: {
                      alias: "updateProfile",
                    },
                  })
                }
              >
                <Button disabled={loadingPic} loading={loadingPic} textColor={colors.color1}>Change Photo</Button>
              </TouchableOpacity>
              <Text style={profileStyles.name}>{user.name}</Text>
              <Text
                style={{
                  fontWeight: "300",
                  color: colors.color2,
                  justifyContent: "space-between",
                }}
              >
                {user.email}
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-between",
                }}
              >
                <ButtonBox
                  handler={navigateHandler}
                  text={"Orders"}
                  icon={"format-list-bulleted-square"}
                />
                {
                  user?.role === "admin" && (
                    <ButtonBox
                      handler={navigateHandler}
                      text={"Admin"}
                      icon={"view-dashboard"}
                      reverse={true}
                    />
                  )
                }
                <ButtonBox
                  handler={navigateHandler}
                  text={"Profile"}
                  icon={"pencil"}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-evenly",
              }}
            >
              <ButtonBox
                handler={navigateHandler}
                text={"Password"}
                icon={"pencil"}
              />
              <ButtonBox
                handler={navigateHandler}
                text={"Sign Out"}
                icon={"exit-to-app"}
              />
            </View>
          </>
        )}
      </View>
      <Footer />
    </>
  );
}

const profileStyles = StyleSheet.create({
  container: {
    elevation: 7,
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: 500,
    marginTop: 10,
    color: colors.color2,
  },
});
