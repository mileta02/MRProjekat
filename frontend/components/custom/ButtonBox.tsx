import { colors } from "@/styles/styles";
import { Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type ButtonBoxProps = {
  icon: IconSource;
  text?: string;
  handler?: any;
  reverse?: boolean;
  loading?: boolean;
};

export default function ButtonBox({
  icon,
  text,
  handler,
  reverse = false,
  loading = false,
}: ButtonBoxProps) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        backgroundColor: reverse ? colors.color1 : colors.color3,
        height: 80,
        width: 80,
        borderRadius: 20,
        alignItems: "center",
      }}
      onPress={() => handler(text)}
      disabled={loading}
    >
      <Avatar.Icon
        size={50}
        color={colors.color2}
        style={{
          backgroundColor: reverse ? colors.color1 : colors.color3,
        }}
        icon={icon}
      />
      <Text
        style={{
          color: colors.color2,
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
