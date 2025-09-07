import { Text, View } from "react-native";

type HeadingProps = {
    text1?: string,
    text2?: string,
    containerStyle: {}
}

export default function Heading({ text1 = "Our", text2 = "Products", containerStyle}: HeadingProps){
  return (
    <View
      style={{
        ...containerStyle
      }}
    >
      <Text style={{ fontSize: 25 }}>{text1}</Text>
      <Text style={{ fontSize: 25, fontWeight: 700 }}>{text2}</Text>
    </View>
  );
};