import Footer from "@/components/custom/Footer";
import { colors, styles } from "@/styles/styles";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const loading = false;

  const submitHandler = () =>{
    router.push("/verify");
  }

  return (
    <>
      <View style={{ ...styles.defaultStyle }}>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text style={localStyles.heading}>Forgot Password</Text>
        </View>
        <View style={localStyles.container}>
          <TextInput
            style={styles.inputsStyling}
            mode="outlined"
            activeOutlineColor={colors.color1}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.forgotPassword}>Go Back</Text>
          </TouchableOpacity>
          <Button
            loading={loading}
            style={styles.btn}
            textColor={colors.color2}
            disabled={email === ""}
            onPress={submitHandler}
          >
            Send OTP
          </Button>
        </View>
      </View>
      <Footer activeRoute="/profile"/>
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
