import React from "react"
import { StyleSheet, View, Text, ActivityIndicator } from "react-native"


const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={ styles.logo }>Grappe</Text>
            <ActivityIndicator size={'large'} />
        </View>
    )
}

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