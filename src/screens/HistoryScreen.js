import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native'
import CartHeader from '../components/cartscreen/CartHeader'


const HistoryScreen = ({ navigation }) => {
    return (
        <View style={ styles.container }>
            <CartHeader 
                label={'Orders'} 
                goBack={() => {
                        navigation.goBack()
                    }
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default HistoryScreen