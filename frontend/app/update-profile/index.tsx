import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { colors, inputOptions, styles } from "@/styles/styles";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";

export default function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");

  const loading = false;

  const disableBtn =
    !name || !email || !address || !city || !country || !pinCode;

  const submitHandler = () => {
    router.push("/verify");
  };

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
          <Text style={localStyles.heading}>Edit Profile</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: 20,
            elevation: 10,
            borderRadius: 10,
            backgroundColor: colors.color3,
          }}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <View style={{ justifyContent: "center" }}>
            <View style={{ justifyContent: "center" }}>
              <TextInput
                style={{ ...inputOptions }}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />

              <TextInput
                style={{ ...inputOptions }}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                style={{ ...inputOptions }}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />
              <TextInput
                style={{ ...inputOptions }}
                placeholder="City"
                value={city}
                onChangeText={setCity}
              />
              <TextInput
                style={{ ...inputOptions }}
                placeholder="Country"
                value={country}
                onChangeText={setCountry}
              />

              <TextInput
                style={{ ...inputOptions }}
                placeholder="Pin Code"
                value={pinCode}
                onChangeText={setPinCode}
              />

              <Button
                loading={loading}
                textColor={colors.color2}
                disabled={disableBtn}
                style={styles.btn}
                onPress={submitHandler}
              >
                Update
              </Button>

              <Text style={styles.or}>OR</Text>
            </View>
          </View>
        </ScrollView>
      </View>
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
