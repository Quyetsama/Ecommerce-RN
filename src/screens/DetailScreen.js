import React, { useRef } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView, TextInput, Animated } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HeaderDetailProdcut from "../components/HeaderDetailProduct"
import CarouselProduct from "../components/CarouselProduct"
import { doMain } from "../helpers/configs"


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const DetailScreen = ({ route, navigation }) => {

    const { image, name, sold, price }  = route.params.product
    const offset = useRef(new Animated.Value(0)).current

    return (
        <View style={ styles.container }>
            <HeaderDetailProdcut navigation={ navigation } animatedValue={ offset } />

            <ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    {
                        useNativeDriver: false 
                    }
                )}
            >
                {/*  */}
                <CarouselProduct images={ image } />
                
                {/*  */}
                <View style={ styles.nameProductContainer }>
                    <View style={{ flex: 1 }}>
                        <Text>{ name }</Text>                
                    </View>
                    <View style={{ marginTop: 5, marginRight: 5 }}>
                        <View style={{ width: 40, height: 40, backgroundColor: 'yellow' }}></View>
                        <View style={ styles.triAngle} />
                        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, marginTop: 5 }}>
                            <Text style={{ fontSize: 8, textAlign: 'center', color: 'black' }}>Giảm 20k</Text>
                        </View>
                    </View>
                </View>
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listImageContainer: {
        width: WIDTH,
        height: HEIGHT / 3,
        backgroundColor: '#fff'
    },
    listImage: {
        flex: 1,
        width: null,
        height: null
    },
    nameProductContainer: {
        flexDirection: 'row'
    },
    triAngle: {
        width: 0,
        height: 0,
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 5,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'yellow',
        borderRightColor: 'yellow',
        borderBottomColor: 'transparent'
    }
})

export default DetailScreen