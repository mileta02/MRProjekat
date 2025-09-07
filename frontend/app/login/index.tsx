import Footer from "@/components/custom/Footer";
import { colors, styles } from "@/styles/styles";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = false;

  return (
    <>
      <View style={{ ...styles.defaultStyle }}>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text style={localStyles.heading}>Login</Text>
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
          <TextInput
            style={styles.inputsStyling}
            mode="outlined"
            activeOutlineColor={colors.color1}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={() => router.push("/forgot-password")}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <Button
            loading={loading}
            style={styles.btn}
            textColor={colors.color2}
            disabled={email === "" || password === ""}
          >
            Log in
          </Button>
          <Text style={styles.or}>OR</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/signup")}
          >
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
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
