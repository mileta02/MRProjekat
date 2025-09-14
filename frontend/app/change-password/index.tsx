import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { colors, styles } from "@/styles/styles";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const loading = false;

  return (
    <>
      <Header back={true} emptyCart={false} />
      <View style={{ ...styles.defaultStyle }}>
        <View
          style={{
            marginBottom: 20,
            marginTop: 60,
          }}
        >
          <Text style={localStyles.heading}>Change Password</Text>
        </View>
        <View style={localStyles.container}>
          <TextInput
            style={styles.inputsStyling}
            mode="outlined"
            activeOutlineColor={colors.color1}
            placeholder="Old Password"
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            style={styles.inputsStyling}
            mode="outlined"
            activeOutlineColor={colors.color1}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={() => router.push("/forgot-password")}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <Button
            loading={loading}
            style={styles.btn}
            textColor={colors.color2}
            disabled={oldPassword === "" || newPassword === ""}
          >
            Update
          </Button>
        </View>
      </View>
      <Footer activeRoute="/profile" />
    </>
  );
}

const localStyles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: colors.color3,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 5,
    justifyContent: "center",
    elevation: 10,
  },
});
