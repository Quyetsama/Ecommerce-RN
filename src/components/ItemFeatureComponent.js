import React from "react"
import { 
    Dimensions,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View
} from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const ItemFeature = ({ color, icon, text }) => {
    return (
        <View>
            <TouchableOpacity style={ styles.iconContainer }>
                <View style={{ ...styles.bgItem, backgroundColor: color }}></View>
                <MaterialCommunityIcons style={{ zIndex: 10 }} name={ icon } size={ 25 } color={ color } />
            </TouchableOpacity>
            <View style={ styles.textContainer }>
                <Text numberOfLines={2} style={ styles.text }>{ text }</Text>
            </View>
        </View>
    )
}

const edge = 55

const styles = StyleSheet.create({
    iconContainer: {
        width: edge, 
        height: edge, 
        borderRadius: 21, 
        justifyContent: 'center', 
        alignItems: 'center', 
        overflow: 'hidden'
    },
    bgItem: {
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        // backgroundColor: '#fa4820', 
        opacity: 0.05
    },
    textContainer: {
        width: edge, 
        marginTop: 5
    },
    text: {
        color: '#000', 
        textAlign: 'center', 
        fontSize: 11
    }
})

export default ItemFeature