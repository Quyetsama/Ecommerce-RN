import React, { useEffect, useRef, useState } from "react"
import { 
    StyleSheet,
    View,
    ScrollView,
    Image,
    Dimensions
} from "react-native"
import { doMain } from "../helpers/configs"


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const CarouselProduct = ({ images }) => {

    const [selectdIndex, setSelectedIndex] = useState(0)

    const setImageSelected = (event) => {
        const viewSize = event.nativeEvent.layoutMeasurement.width - 20

        const contentOffset = event.nativeEvent.contentOffset.x

        const indexSelected = Math.floor(contentOffset / viewSize)

        setSelectedIndex(indexSelected)
    }

    return (
        <View style={ styles.carouselContainer }>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal 
                pagingEnabled 
                onMomentumScrollEnd={ setImageSelected }
            >
                {images.map((image, index) => (
                    <Image
                        key={ index }
                        style={styles.imgCarousel}
                        source={{ uri: doMain + '/image/' + image }}
                        resizeMode='contain'
                    />
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
        width: WIDTH,
        height: HEIGHT / 2,
        backgroundColor: '#fff'
    },
    imgCarousel: {
        width: WIDTH,
        height: HEIGHT / 2
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

export default React.memo(CarouselProduct)