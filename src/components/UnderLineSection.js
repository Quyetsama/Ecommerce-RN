import React from "react"
import { Dimensions, StyleSheet, View } from "react-native"


const WIDTH = Dimensions.get('window').width

const UnderLineSection = () => {
    return (
        <View style={styles.underLineSection} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    bodyContainer: {
        flex: 1
    },
    underLineSection: {
        width: WIDTH,
        height: 10,
        backgroundColor: '#f0f1f2'
    }
})

export default UnderLineSection