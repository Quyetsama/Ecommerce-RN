import React, { useState } from 'react'
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { violet } from '../../helpers/configs'
import Ionicons from 'react-native-vector-icons/Ionicons'


const WIDTH = Dimensions.get('window').width


const SelectImage = () => {
    return (
        <TouchableOpacity style={ styles.selectImage } activeOpacity={0.5}>
            <Text style={{ color: violet, fontSize: 12 }}>Thêm ảnh</Text>
        </TouchableOpacity>
    )
}

const AddImage = ({ listImage, remove }) => {

    // const [images, setImages] = useState(listImage)

    // const removeImage = (id) => {
    //     const newImages = images.filter((item, index) => index !== id)
    //     setImages(newImages)
    // }

    return (
        <View style={ styles.container }>
            {/* <ScrollView horizontal> */}
                <FlatList
                contentContainerStyle={ styles.flatlistContainer }
                showsHorizontalScrollIndicator={ false }
                horizontal
                data={listImage}
                // numColumns={4}
                renderItem={({item, index}) => (
                    <View style={ styles.imageContainer }>
                        <TouchableOpacity style={ styles.iconRemove } onPress={() => remove(index)}>
                            <Ionicons name={'close-circle'} size={20} color={'rgba(52, 52, 52, 0.4)'} />
                        </TouchableOpacity>
                        <Image
                            key={ index } 
                            style={ styles.image }
                            source={{ uri: item }}
                        />
                    </View>
                )}
                ListHeaderComponent={
                    <SelectImage />
                }
            />
            {/* </ScrollView> */}
        </View>
    )
}

const x = (WIDTH / 4) - 20

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    flatlistContainer: {
        paddingLeft: 10,
        paddingVertical: 10
    },
    imageContainer: {
        width: x,
        height: x,
        marginRight: 10
    },
    image: {
        flex: 1,
        width: null,
        height: null
    },
    iconRemove: {
        position: 'absolute',
        top: -10,
        right: -10,
        zIndex: 10
    },
    selectImage: {
        width: x,
        height: x,
        marginRight: 10,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: violet,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default React.memo(AddImage)