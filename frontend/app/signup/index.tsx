import Footer from "@/components/custom/Footer";
import { colors, inputOptions, styles } from "@/styles/styles";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");

  const loading = false;

  const disableBtn =
    !name || !email || !password || !address || !city || !country || !pinCode;

  const submitHandler = () => {
    router.push("/verify");
  };

  const { imageParam } = useLocalSearchParams();
    const [image, setImage] = useState("");
  
    useEffect(() => {
      if (imageParam) {
        setImage(imageParam as string);
        
      }
    }, [imageParam]);

  return (
    <>
      <View style={{ ...styles.defaultStyle }}>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text style={localStyles.heading}>Sign Up</Text>
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
            {image ? (
                  <Avatar.Image
                    size={80}
                    style={{ backgroundColor: colors.color1 }}
                    source={{ uri: image }}
                  />
                ) : (
                  <Avatar.Icon
                    icon="image"
                    size={80}
                    style={{ backgroundColor: colors.color2 }}
                  />
                )}
            <TouchableOpacity onPress={() => router.push("/camera")}>
              <Button textColor={colors.color1}>Change Photo</Button>
            </TouchableOpacity>
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
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
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
                Sign Up
              </Button>

              <Text style={styles.or}>OR</Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("/login")}
              >
                <Text style={styles.link}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
