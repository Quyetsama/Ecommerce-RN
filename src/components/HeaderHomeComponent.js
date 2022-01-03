import React from "react"
import { 
    Keyboard,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View
} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'


const HeaderHomeComponent = ({ navigation }) => {

    const goToSearch= () => {
        navigation.navigate('stackSearch')
    }

    const goToCart = () => {
        navigation.navigate('tabOrder')
    }

    return (
        <View style={ styles.headerContainer }>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={ styles.logo }>Grabee</Text>
                <TouchableOpacity 
                    style={ styles.iconCartHeader }
                    onPress={ goToCart }
                >
                    <View style={ styles.iconBadge }>
                        <Text style={{ color: '#fff', fontSize: 11 }}>3</Text>
                    </View>
                    <Ionicons name={ 'cart-outline' } size={ 28 } color={ '#fff' } />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={1} style={ styles.inputSearchContainer } onPress={ goToSearch }>
                    <Ionicons name={ 'search-outline' } size={ 21 } color={ 'gray' } />
                    <TextInput editable={false} style={ styles.inputSearch } placeholderTextColor={ color } placeholder="Search..."></TextInput>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const color = '#34A853'

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: color,
        // flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        elevation: 5
    },
    logo: {
        flex: 1, 
        color: '#fff', 
        fontSize: 20, 
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
        marginLeft: 10,
        marginTop: 10
    },
    iconBadge: {
        position: 'absolute',
        bottom: 18,
        left: 13,
        zIndex: 10,
        backgroundColor: color,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff'
    }
})

export default HeaderHomeComponent