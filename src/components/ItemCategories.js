import React, { useState } from "react"
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native"



const ItemCategories = ({ onPress, image, text, indexSelected }) => {
    return (
        <TouchableOpacity
            onPress={ onPress }
            style={[
                styles.itemContainer,
                {
                    borderWidth: indexSelected ? 1 : null,
                    borderColor: indexSelected ? color : null
                }
            ]} 
            activeOpacity={1}
        >
            <View style={ styles.imgContainer }>
                <Image
                    style={ styles.img }
                    source={{ uri: image }}
                />
            </View>
            <View>
                <Text numberOfLines={2} style={ styles.text }>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

const color = '#34A853'

const styles = StyleSheet.create({
    itemContainer: {
        width: 80,
        height: 80,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginRight: 5,
        borderRadius: 5
    },
    imgContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#f2f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 5
    },
    img: {
        width: 20,
        height: 20
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        marginHorizontal: 5,
        marginTop: 2
    }
})

export default ItemCategories