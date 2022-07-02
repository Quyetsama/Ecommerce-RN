import React, { useState } from "react"
import { 
    StyleSheet,
    View,
    ScrollView,
    Image,
} from "react-native"
import { URL_API, WINDOW_WIDTH, WINDOW_HEIGHT } from "../utils"


const CarouselProduct = ({ images }) => {

    const [selectdIndex, setSelectedIndex] = useState(0)

    const setImageSelected = (event) => {
        const viewSize = event.nativeEvent.layoutMeasurement.width

        const contentOffset = event.nativeEvent.contentOffset.x

        const indexSelected = Math.floor(contentOffset / viewSize)

        setSelectedIndex(indexSelected)
    }

    return (
        <View style={ styles.carouselContainer }>
            <ScrollView
                style={{ flex: 1 }}
                showsHorizontalScrollIndicator={false}
                horizontal 
                pagingEnabled 
                onMomentumScrollEnd={ setImageSelected }
            >
                {images?.map((image, index) => (
                    <Image
                        key={ index }
                        style={styles.imgCarousel}
                        source={{ uri: URL_API + '/image/' + image }}
                        resizeMode='center'
                    />
                ))}
            </ScrollView>
            <View style={ styles.circleDiv }>
                {images?.map((image, index) => (
                    <View
                        key={ index }
                        style={[ styles.whiteCircle, {opacity: index === selectdIndex ? 1 : 0.3} ]}
                    ></View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    carouselContainer: {
        height: WINDOW_HEIGHT * 0.5,
    },
    imgCarousel: {
        // paddingHorizontal: 18 => -36
        width: WINDOW_WIDTH - 36,
        height: null
    },
    circleDiv: {
        position: 'absolute',
        bottom: 14,
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
        backgroundColor: 'grey'
    }
})

export default React.memo(CarouselProduct)