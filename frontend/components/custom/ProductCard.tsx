import { Image, TouchableOpacity, View, Text } from "react-native"
import { NavigationProp } from "./SearchModal"
import { colors } from "@/styles/styles"
import { Button } from "react-native-paper"

export type ProductCardProps = {
    stock: number,
    name: string,
    price: number,
    image: string,
    id: string,
    addToCardHandler: (id: string, stock: number) => void,
    navigate: NavigationProp,
    index: number
}

export default function ProductCard({stock, name, price, image, id, addToCardHandler, navigate, index}: ProductCardProps){
    return(
       <TouchableOpacity activeOpacity={1} onPress={()=> navigate.navigate("productdetails", {id})}>
            <View style = {{
                elevation: 5,
                width: 220,
                alignItems:  "center",
                justifyContent: "space-between",
                margin: 20,
                height: 400,
                backgroundColor:  index % 2 === 0 ? colors.color1 : colors.color2,
                borderRadius: 20

            }}>
                <Image
                    source={{
                        uri: image,

                    }}
                    style={{
                        width: "100%",
                        height: 200,
                        resizeMode: "contain",
                        position: "absolute",
                        left: 50,
                        top: 105
                    }}
                />
                <View style ={{
                    flexDirection: "row",
                    padding: 20,
                    justifyContent: "space-between",
                    width: "100%",
                }}>
                    <Text numberOfLines= {2} style = {{
                        color: index % 2 === 0 ? colors.color2 : colors.color3,
                        fontSize: 25,
                        fontWeight: "300"
                    }}>{name}</Text>
                     <Text numberOfLines= {2} style = {{
                        color: index % 2 === 0 ? colors.color2 : colors.color3,
                        fontSize: 25,
                        fontWeight: "700"
                    }}>${price}</Text>
                </View>
                <TouchableOpacity style ={{
                    backgroundColor: index % 2 == 0 ? colors.color2 : colors.color1,
                    borderRadius: 0,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    width: "100%"
                }}>
                    <Button  textColor={index % 2 === 0 ? colors.color1 : colors.color2} onPress={()=> addToCardHandler(id, stock)}>
                        Add To Cart
                    </Button>
                </TouchableOpacity>
            </View>
       </TouchableOpacity>
    )
}