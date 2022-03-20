import React from "react"
import { 
    Keyboard,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    Animated,
    Image
} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NAME } from "../helpers/configs"
// import grabee from '../assets/img/grabee.png'


const WIDTH = Dimensions.get('window').width
const Header_Max_Height = 100
const Header_Min_Height = 60

const HeaderHomeComponent = ({ navigation, animatedValue }) => {
    const animatedHeaderHeight = animatedValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        outputRange: [Header_Max_Height, Header_Min_Height],
        extrapolate: 'clamp'
    })

    const animatedHeaderOpacityText = animatedValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })

    const animatedHeaderInput = animatedValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        // margin left 20 thif phair truwf 40
        outputRange: [WIDTH - 20, WIDTH - 55],
        extrapolate: 'clamp'
    })
    
    const animatedMascot = animatedValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        // margin left 20 thif phair truwf 40
        outputRange: [(WIDTH / 2) + 35, (WIDTH / 4) ],
        extrapolate: 'clamp'
    })
    
    const animatedWidthMascot = animatedValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        // margin left 20 thif phair truwf 40
        outputRange: [70, 0],
        extrapolate: 'clamp'
    })

    return (
        <Animated.View style={[
            styles.headerContainer,
            {
                height: animatedHeaderHeight
            }
        ]}>
            <Animated.Text style={[
                styles.logo,
                {
                    opacity: animatedHeaderOpacityText
                }
            ]}>
                { NAME }
            </Animated.Text>

            <Animated.View style={{ position: 'absolute', top: 0, left: animatedMascot, opacity: animatedHeaderOpacityText }}>
                {/* <Animated.Image style={{ width: animatedWidthMascot, height: animatedWidthMascot }} source={ grabee } /> */}
            </Animated.View>


            <TouchableOpacity
                style={styles.iconCartHeader}
            >
                <View style={styles.iconBadge}>
                    <Text style={{ color: '#fff', fontSize: 11 }}>3</Text>
                </View>
                <Ionicons name={'cart-outline'} size={25} color={'#fff'} />
            </TouchableOpacity>
            <Animated.View style={{ flexDirection: 'row', width: animatedHeaderInput }}>
                <TouchableOpacity activeOpacity={1} style={styles.inputSearchContainer}>
                    <Ionicons name={'search-outline'} size={21} color={'gray'} />
                    <TextInput editable={false} style={styles.inputSearch} placeholderTextColor={color} placeholder="Search..."></TextInput>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    )
}

const color = '#34A853'

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: color,
        justifyContent: 'flex-end',
        // flexDirection: 'row',
        // alignItems: 'center',
        paddingHorizontal: 10,
        elevation: 5
    },
    logo: {
        position: 'absolute',
        top: 5,
        left: 10,
        flex: 1,
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold'
    },
    inputSearchContainer: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 3
    },
    inputSearch: {
        flex: 1,
        color: color,
        height: 40
    },
    iconCartHeader: {
        position: 'absolute',
        top: 10,
        right: 15,
        marginLeft: 10,
        marginTop: 5
    },
    iconBadge: {
        position: 'absolute',
        bottom: 15,
        left: 13,
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
    }
})

export default HeaderHomeComponent