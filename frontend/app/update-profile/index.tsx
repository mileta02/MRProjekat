import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { updateProfile } from "@/redux/actions/otherActions";
import { AppDispatch, RootState } from "@/redux/store";
import { colors, inputOptions, styles } from "@/styles/styles";
import { useMessageAndErrorOther } from "@/utils/hooks";
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
import { useDispatch, useSelector } from "react-redux";

export default function UpdateProfile( {navigation}: any) {

  const { user } = useSelector((state: RootState) => state.user);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);
  const [country, setCountry] = useState(user?.country);
  const [pinCode, setPinCode] = useState(user?.pinCode.toString());
  const dispatch = useDispatch<AppDispatch>();

  const loading = useMessageAndErrorOther(dispatch, navigation, "profile");

  

  const submitHandler = () => {
    //router.push("/verify");
    dispatch(updateProfile(name,email,address,city,country,Number(pinCode)));
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
