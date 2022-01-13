import React from "react"
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Animated, Dimensions } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HEIGHT = Dimensions.get('window').height
const Header_Max_Height = HEIGHT / 2
const Header_Min_Height = 60

const HeaderDetailProdcut = ({ navigation, animatedValue }) => {

    const animatedHeaderOpacity = animatedValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })

    const animatedIconOpacity = animatedValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        outputRange: [0.4, 0],
        extrapolate: 'clamp'
    })

    return (
        <>
            {/* <TouchableOpacity style={{  position: 'absolute', top: 13, left: 8, zIndex: 10, marginRight: 10 }} 
            onPress={() => navigation.goBack()}>
                <Animated.View style={{ position: 'absolute', width: 35, height: 35, backgroundColor: 'gray', borderRadius: 30, opacity: 0.4 }}></Animated.View>
                <MaterialCommunityIcons style={{ padding: 5 }} name="keyboard-backspace" size={25} color={'#fff'} />
            </TouchableOpacity> */}

            <TouchableOpacity
                style={{ position: 'absolute', top: 3, left: -3, zIndex: 10, margin: 10 }}
                onPress={() => navigation.goBack()}
            >
                <View style={ styles.backgroundIconLeft }></View>
                <MaterialCommunityIcons style={{ padding: 5 }} name="keyboard-backspace" size={25} color={'#fff'} />
            </TouchableOpacity>
            
            <Animated.View style={[ 
                styles.headerContainer,
                {
                    opacity: animatedHeaderOpacity
                }
            ]}>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
                    <Animated.View style={[ styles.backgroundIconLeft, { opacity: 0 } ]}></Animated.View>
                    <MaterialCommunityIcons style={{ padding: 5 }} name="keyboard-backspace" size={25} color={color} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={styles.inputSearchContainer}>
                    <Ionicons name={'search-outline'} size={21} color={'gray'} />
                    <TextInput editable={false} style={styles.inputSearch} placeholderTextColor={'#969696'} placeholder="Search..."></TextInput>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.iconCartHeader}
                >
                    <View style={[ styles.backgroundIconRight, { opacity: 0 } ]}></View>
                    <View style={styles.iconBadge}>
                        <Text style={{ color: '#fff', fontSize: 11 }}>3</Text>
                    </View>
                    <Ionicons name={'cart-outline'} size={25} color={color} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.iconCartHeader}
                >
                    <View style={[ styles.backgroundIconRight, { opacity: 0 } ]}></View>
                    <Ionicons name={'ellipsis-horizontal-outline'} size={25} color={color} />
                </TouchableOpacity>
            </Animated.View>

            {/*  */}
            <TouchableOpacity
                style={{ position: 'absolute', top: 8, right: 53, zIndex: 10, margin: 10 }}
            >
                <View style={ styles.backgroundIconRight }></View>
                <View style={styles.iconBadge}>
                    <Text style={{ color: '#fff', fontSize: 11 }}>3</Text>
                </View>
                <Ionicons name={'cart-outline'} size={25} color={'#fff'} />
            </TouchableOpacity>

            <TouchableOpacity
                style={{ position: 'absolute', top: 8, right: 8, zIndex: 10, margin: 10 }}
            >
                <View style={ styles.backgroundIconRight }></View>
                <Ionicons name={'ellipsis-horizontal-outline'} size={25} color={'#fff'} />
            </TouchableOpacity>
        </>
        
    )
}

const color = 'tomato'

const backgroundIcon = {
    position: 'absolute',
    width: 35, 
    height: 35, 
    backgroundColor: 'rgba(52, 52, 52, 0.4)', 
    borderRadius: 30,
    // opacity: 0.4
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 8,
        elevation: 10
    },
    inputSearchContainer: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 20,
        // marginBottom: 10,
        marginRight: 5,
        paddingHorizontal: 10,
        borderRadius: 3
    },
    inputSearch: {
        flex: 1,
        color: color,
        height: 40
    },
    iconCartHeader: {
        // marginLeft: 10
        margin: 10
    },
    iconBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        zIndex: 10,
        backgroundColor: color,
        width: 19,
        height: 19,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'red'
    },
    backgroundIconLeft: {
        ...backgroundIcon,
        top: 0,
        left: 0
    },
    backgroundIconRight: {
        ...backgroundIcon,
        top: -5, left: -5
    }
})

export default HeaderDetailProdcut