import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import { doMain } from '../utils/configs'



const FlatCart = ({ item, onPress }) => {
    return (
        <TouchableOpacity 
            style={ styles.container }
            onPress={ onPress }
        >
            <View style={ styles.imageContainer }>
                <Image
                    style={ styles.image }
                    source={{ uri: doMain + 'image/' + item.image }}
                />
            </View>
            <Text numberOfLines={ 1 } style={ styles.text }>{ item.name }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 12,
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        width: null,
        height: null
    },
    text: {
        flex: 1,
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 18
    }
})

export default FlatCart