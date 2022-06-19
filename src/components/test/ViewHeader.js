import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import CarouselComponent from '../CarouselComponent'
import Header from './Header'
import { COLORS } from '../../theme'


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const ViewHeader = () => {
    return (
        <View style={ styles.container }>

            {/* <View style={ styles.headerContainer }>
                <Header />
            </View> */}

            {/* <View style={ styles.topContainer }></View>
            <View style={ styles.botContainer }></View> */}

            {/* <View style={ styles.imageCarousel }> */}
                <CarouselComponent />
            {/* </View> */}
        </View>
    )
}

const HEIGHT_COMPONENT = HEIGHT / 4

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT_COMPONENT,
        backgroundColor: 'red',
        marginBottom: 1000
    },
    topContainer: {
        flex: 2,
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    botContainer: {
        flex: 1
    },
    headerContainer: {
        position: 'absolute',
        top: 15,
        left: 0,
        zIndex: 10,
        width: WIDTH
    },
    imageCarousel: {
        position: 'absolute',
        top: 0,
        // bottom: HEIGHT_COMPONENT / 4.5,
    }
})

export default React.memo(ViewHeader)