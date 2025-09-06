import Header from "@/components/custom/Header";
import { colors } from "@/styles/styles";
import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native";


export default function ProductDetails(){

    const {id: number} = useLocalSearchParams();

    return(
        <View style={{
            padding: 0,
            backgroundColor: colors.color1
        }}>
            <Header back={true} emptyCart={false}/>
            <Text>Product details</Text>
        </View>
    )
}