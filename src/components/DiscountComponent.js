import React from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Discount = ({ percent }) => {
    return (
        <View>
            <View style={{ width: 40, height: 40, backgroundColor: '#f7ed2a' }}></View>
            <View style={ styles.triAngle} />
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, marginTop: 5 }}>
                <Text style={{ fontSize: 12, textAlign: 'center', color: 'tomato', fontWeight: '500' }}>{ percent }%</Text>
                <Text style={{ fontSize: 12, textAlign: 'center', color: '#fff', fontWeight: '500' }}>GIẢM</Text>
            </View>
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
        borderLeftColor: '#f7ed2a',
        borderRightColor: '#f7ed2a',
        borderBottomColor: 'transparent'
    }
})

export default Discount