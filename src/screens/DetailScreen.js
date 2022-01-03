import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"



const DetailScreen = ({ navigation }) => {
    return (
        <View style={ styles.container }>
            <Text>DetailScreen</Text>
            <TouchableOpacity
                onPress={() => navigation.push('stackDetail')}
            >
                <Text>Go to Detail again</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default DetailScreen