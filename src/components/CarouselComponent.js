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


const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

const images = [
    'https://pbs.twimg.com/media/DMPlnjyVoAA2yDt?format=jpg&name=4096x4096',
    'https://brands.vn/wp-content/uploads/2020/10/Cach-dang-ky-ban-hang-tren-Grab-Food.png',
    'http://blog.abit.vn/wp-content/uploads/2020/05/dang-ky-ban-hang-tren-grab-food5.jpeg',
    'https://muasieunhanh.com/wp-content/uploads/2020/08/ma-khuyen-mai-grab.jpg',
    'https://websitecuckukvn.misacdn.net/wp-content/uploads/2019/06/1_rR2tfprPZNBEYRBV3PeGrQ-1024x568.jpeg'
]

const CarouselComponent = () => {

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
                {images.map((image, index) => (
                    <View style={ styles.imgContainer } key={ index }>
                        <Image
                            style={styles.imgCarousel}
                            source={{
                                uri: image
                            }}
                            resizeMode='cover'
                        />
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
}

const color = '#34A853'

const styles = StyleSheet.create({
    carouselContainer: {
        // margin: 10,
        // borderRadius: 20,
        // overflow: 'hidden'
    },
    imgContainer: {
        margin: 10,
        borderRadius: 15,
        overflow: 'hidden'
    },
    imgCarousel: {
        width: widthScreen - 20,
        height: 130
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
        backgroundColor: '#34A853'
    }
})

export default React.memo(CarouselComponent)