import React, { useEffect, useRef, useState } from "react"
import { 
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Image,
    Dimensions
} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Carousel from 'react-native-snap-carousel'
import { SCREEN } from "../utils/configs"
import { SceneMap } from "react-native-tab-view"
import useFetchCarousel from "../hooks/useFetchCarousel"
import { URL_API } from "../utils"


const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

const images = [
    'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=698&q=80',
    'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
]

const CarouselComponent = () => {

    const products = useFetchCarousel()
    const scrollRef = useRef()
    const [selectdIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        const time = setInterval(() => {
            setSelectedIndex(prev => {
                // console.log(prev)
                const index = prev === images.length - 1 ? 0 : prev + 1

                scrollRef.current.scrollTo({
                    animated: true,
                    y: 0,
                    x: ( widthScreen ) * (index)
                })

                return index
            })
        }, 5000)

        return () => clearInterval(time)
    }, [])

    const setImageSelected = (event) => {
        const viewSize = event.nativeEvent.layoutMeasurement.width - 20

        const contentOffset = event.nativeEvent.contentOffset.x

        const indexSelected = Math.floor(contentOffset / viewSize)

        // console.log('viewSize', viewSize)
        // console.log('contentOffset', contentOffset)
        // console.log('indexSelected', indexSelected)
        // console.log('_____')

        setSelectedIndex(indexSelected)
    }

    // console.log('Carousel render')

    return (
        <View style={ styles.carouselContainer }>
            <ScrollView
                ref={ scrollRef }
                showsHorizontalScrollIndicator={false}
                horizontal 
                pagingEnabled 
                onMomentumScrollEnd={ setImageSelected }
            >
                {products.map((item, index) => (
                    <View style={ styles.itemContainer } key={ index }>
                        <View style={ styles.imgContainer }>
                            <Image
                                style={styles.imgCarousel}
                                source={{
                                    uri: URL_API + '/image/' + item.image
                                }}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={ styles.txtContainer }>
                            <View>
                                <Text style={ styles.txtTopic }>Introducing</Text>
                                <Text numberOfLines={2} style={ styles.txtName }>Air Max 2090</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={ styles.btnContainer }>
                                    <Text style={ styles.buyNow }>Buy Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={ styles.circleDiv }>
                {images.map((image, index) => (
                    <View
                        key={ index }
                        style={[ styles.whiteCircle, {opacity: index === selectdIndex ? 1 : 0.3} ]}
                    ></View>
                ))}
            </View>
        </View>
    )

    // _renderItem = ({item, index}) => {
    //     return (
    //         <View style={styles.slide}>
    //             <Image
    //                 style={{
    //                     flex: 1,
    //                     width: null,
    //                     height: null,
    //                 }}
    //                 source={{ uri: item }}
    //                 resizeMode='stretch'
    //             />
    //         </View>
    //     )
    // }

    // return (
    //     <Carousel
    //         // ref={(c) => { this._carousel = c; }}
    //         data={ images }
    //         renderItem={this._renderItem}
    //         sliderWidth={SCREEN.WIDTH}
    //         itemWidth={SCREEN.WIDTH}
    //         loop={ true }
    //         autoplay={ true }
    //         // autoplayInterval={ 10000 }
    //     />
    // )
}

const color = '#34A853'
const margin = 20
const IMG_WIDTH = widthScreen - margin * 2
const IMG_HEIGHT = IMG_WIDTH * 0.5


const styles = StyleSheet.create({
    carouselContainer: {
        // margin: 10,
        // borderRadius: 20,
        // overflow: 'hidden'
    },
    itemContainer: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: margin,
        marginRight: margin,
        borderRadius: 15,
        overflow: 'hidden',
        width: IMG_WIDTH,
        height: IMG_HEIGHT,

        backgroundColor: '#faf9ff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10
    },
    imgContainer: {
        // flex: 1.3, 
        width: IMG_WIDTH / 2, 
        height: (IMG_HEIGHT * 2) / 3, 
        alignItems: 'center',
        marginHorizontal: 18
    },
    imgCarousel: {
        // flex: 1,
        width: IMG_WIDTH / 2,
        height: (IMG_HEIGHT * 2) / 3,
        borderRadius: 15
    },
    circleDiv: {
        position: 'absolute',
        bottom: 15,
        height: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    whiteCircle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        backgroundColor: '#ababab'
    },
    txtContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: IMG_WIDTH / 2,
        height: (IMG_HEIGHT * 2) / 3
    },
    txtTopic: {
        color: '#2c2c2c',
        fontWeight: '500'
    },
    txtName: {
        color: '#2c2c2c',
        fontWeight: '800',
        fontSize: 18
    },
    btnContainer: {
        backgroundColor: '#2c2c2c',
        alignItems: 'center',
        borderRadius: 7,
        marginTop: 10
    },
    buyNow: {
        color: '#fff',
        paddingVertical: 7,
        paddingHorizontal: 10
    },
    slide: {
        width: '100%',
        height: 250
    }
})

export default React.memo(CarouselComponent)