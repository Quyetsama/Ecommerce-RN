import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"



const SearchScreen = ({ navigation }) => {
    return (
        <View style={ styles.container }>
            <Text>Search</Text>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Text style={{ color: '#429ae3' }}>Go Back</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                onPress={() => navigation.navigate('stackAuth')}
            >
                <Text style={{ color: '#429ae3' }}>Go Auth</Text>
            </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SearchScreen