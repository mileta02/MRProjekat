import Footer from "@/components/custom/Footer";
import { colors, inputOptions, styles } from "@/styles/styles";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const loading = false;

  const submitHandler = () => {};

  return (
    <>
      <View style={styles.defaultStyle}>
        {/* Heading */}
        <View style={{ marginBottom: 20 }}>
          <Text style={localStyles.heading}>Reset Password</Text>
        </View>

        <View style={localStyles.container}>
          <TextInput
            {...inputOptions}
            placeholder="OTP"
            secureTextEntry={true}
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />

          <TextInput
            {...inputOptions}
            placeholder="New Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <Button
            loading={loading}
            textColor={colors.color2}
            disabled={otp === "" || password === ""}
            style={styles.btn}
            onPress={submitHandler}
          >
            Reset
          </Button>

          <Text style={styles.or}>OR</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/forgot-password")}
          >
            <Text style={styles.link}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer activeRoute="profile" />
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