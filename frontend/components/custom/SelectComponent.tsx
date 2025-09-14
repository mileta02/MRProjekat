import { colors, localStyles, styles } from "@/styles/styles"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Avatar, Headline } from "react-native-paper"

type categories = {
    _id: string;
    category: string
}

type SelectComponentProps = {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setCategory: React.Dispatch<React.SetStateAction<string>>,
    setCategoryId: React.Dispatch<React.SetStateAction<string>>,
    categories: categories[]
}

export default function SelectComponent(props: SelectComponentProps){

    const selectCategoryHandler = (i: categories) => {
        props.setCategory(i.category);
        props.setCategoryId(i._id);
        props.setVisible(false);
    }

    return (
        props.visible &&  (
            <View style = {{...selectStyles.container, zIndex:100}}>
                <TouchableOpacity onPress={()=> props.setVisible(false)}>
                    <Avatar.Icon size={30} style={{
                        alignSelf: "flex-end",
                        backgroundColor: colors.color1,
                        top: -15,
                        right: -15
                    }}
                    icon={"close"}
                    />
                </TouchableOpacity>
                <Headline style={selectStyles.heading}>Select a Category</Headline>
            
                    {props.categories.map(i=>(
                        <Text style={selectStyles.text} onPress={()=>selectCategoryHandler(i)}>
                            {i.category}
                        </Text>
                    ))}
            </View>
        )
    )
}

const selectStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.color2,
        position: "absolute",
        padding: 35,
        borderRadius: 20,
        width: "90%",
        height: "90%",
        alignSelf: "center",
        elevation: 5,
        top: 50,
    },
    heading:{
        textAlign: "center",
        marginVertical: 10,
        backgroundColor: colors.color3,
        borderRadius: 5,
        padding: 3,
        color: colors.color2
    },
    text: {
        fontSize: 17,
        fontWeight: "100",
        textTransform: "uppercase",
        marginVertical: 10,
    }
})