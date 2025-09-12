import { colors } from "@/styles/styles";
import { ActivityIndicator } from "react-native-paper";


export default function Loader(){

    return (
        <ActivityIndicator
            style={{
                top: "50%",
                position: "absolute",
                alignSelf: "center"
            }}
            size={100}
            color={colors.color3}
        />
    )
}