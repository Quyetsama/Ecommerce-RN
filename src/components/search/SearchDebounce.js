import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import FlatCart from '../FlatCard'
import { useNavigation } from '@react-navigation/native'
import { SCREEN, COLOR } from '../../helpers/configs'
import notFoundIMG from '../../assets/img/notFound.png'


const Section = ({ title, seeMore, data }) => {
    const navigation = useNavigation()

    return (
        <>
            <View style={ styles.titleContainer }>
                <Text style={ styles.titleText }>{ title }</Text>
                {
                    seeMore &&
                    <TouchableOpacity
                        onPress={ seeMore }
                    >
                        <Text style={ styles.seeAll }>See more</Text>
                    </TouchableOpacity>
                }
            </View>
            {
                data?.map(item => (
                    <FlatCart 
                        key={ item._id }
                        item={ item }
                        onPress={() => {
                            navigation.goBack()
                            navigation.navigate('Detail', { _id: item._id })
                        }}
                    />
                ))
            }
        </>
    )
}

const SearchDebounce = ({ data, notFound, onSeeMore }) => {
    // console.log(data)

    if(data.type === 0) return (
        <View style={ styles.container }>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <Section title={ 'Suggest' } data={ data.data } />
            </ScrollView>
        </View>
    )

    if(data.type === 2 && notFound) return (
        <Image
            style={ styles.notFound }
            source={ notFoundIMG }
        />
    )

    return (
        <View style={ styles.container }>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <Section title={ 'Products' } seeMore={ onSeeMore } data={ data.data } />
                {/* <Section title={ 'Categories' } seeAll data={ data.data.categories } /> */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    notFound: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 20
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 12
    },
    titleText: {
        flex: 1,
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    },
    seeAll: {
        color: COLOR.violet,
        fontSize: 16
    }
})

export default SearchDebounce