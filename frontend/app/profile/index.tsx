import { colors, localStyles, styles } from "@/styles/styles";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-paper";

export default function Profile() {

    const [user, setUser] = useState({
        name: "Andrej"
    });

  return (
    <View style={{ ...styles.defaultStyle }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={localStyles.heading}>Profile</Text>
      </View>

      <View style={profileStyles.container}>
        <Avatar.Image
          source={{}}
          size={100}
          style={{ backgroundColor: colors.color1 }}
        />
        <TouchableOpacity onPress={()=> router.push("/camera")}>
            <Button textColor={colors.color1}>Change Photo</Button>
        </TouchableOpacity>
        <Text style = {profileStyles.name}>{user.name}</Text>
      </View>
    </View>
  );
}

const profileStyles = StyleSheet.create({
    container: {
        elevation: 7,
        backgroundColor: colors.color3,
        padding: 30,
        borderRadius: 10,
        alignItems: "center"
    },
    name: {
        fontSize: 20,
        fontWeight: 500,
        marginTop: 10,
        color: colors.color2
    }
})

