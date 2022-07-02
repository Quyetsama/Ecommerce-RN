import React, { useState, useRef } from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import useFetchCarousel from '../hooks/useFetchCarousel'
import { URL_API, WINDOW_WIDTH, WINDOW_HEIGHT, COLORS } from '../utils'
import { useNavigation } from '@react-navigation/native'



const CarouselHome = () => {

    const navigation = useNavigation()

    const products = useFetchCarousel()
    const isCarousel = React.useRef(null)
    const [index, setIndex] = React.useState(0)

    return (
        <View>
            <Carousel
                // layout="tinder"
                loop={ true }
                autoplay={ true }
                autoplayDelay={ 5000 }
                autoplayInterval={ 5000 }
                enableMomentum={ false }
                lockScrollWhileSnapping={ true }
                layout={'default'}
                // layoutCardOffset={9}
                ref={isCarousel}
                data={products}
                renderItem={({item, index}) => {
                    return (
                        <View key={ item._id } style={ styles.slideContainer }>
                            <Image
                                style={styles.imgCarousel}
                                source={{
                                    uri: URL_API + '/image/' + item.image
                                }}
                                resizeMode='center'
                            />
                            <View style={ styles.txtContainer }>
                                <View>
                                    <Text style={ styles.txtTopic }>Introducing</Text>
                                    <Text numberOfLines={2} style={ styles.txtName }>{ item.name }</Text>
                                </View>
                                <View>
                                    <TouchableOpacity 
                                        style={ styles.btnContainer }
                                        onPress={() => navigation.navigate('Detail', { _id: item._id })}
                                    >
                                        <Text style={ styles.buyNow }>Buy Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
                }}
                sliderWidth={WINDOW_WIDTH}
                itemWidth={WINDOW_WIDTH - 36}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
            />
            <Pagination
                dotsLength={products.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.92)'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    slideContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginVertical: 18,
        padding: 18,
        borderRadius: 15,
        elevation: 10
    },
    imgCarousel: {
        flex: 1,
        alignSelf: 'flex-start',
        height: WINDOW_WIDTH / 3,
        borderRadius: 15
    },
    txtContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: WINDOW_WIDTH / 3,
        marginLeft: 18
    },
    txtTopic: {
        color: COLORS.primary,
        fontWeight: '500'
    },
    txtName: {
        color: COLORS.primary,
        fontWeight: '800',
        fontSize: 18
    },
    btnContainer: {
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10
    },
    buyNow: {
        color: COLORS.white,
        paddingVertical: 8,
        paddingHorizontal: 10
    },
})

export default CarouselHome