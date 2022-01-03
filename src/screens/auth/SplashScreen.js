import React from "react"
import { StyleSheet, View, Text, ActivityIndicator, StatusBar } from "react-native"


const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={color} />
            <Text style={ styles.logo }>Grabee</Text>
            <ActivityIndicator size={'large'} color={'#fff'} />
        </View>
    )
}

const color = '#34A853'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34A853',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        color: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 30
    }
})

export default SplashScreen