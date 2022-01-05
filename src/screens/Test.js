import React from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import CarouselComponent from "../components/CarouselComponent"
import ProductDiscount from "../components/ProductDiscountComponent"
import ProductLimit from "../components/ProductLimitComponent"
import FeaturesComponent from "../components/FeaturesComponent"



const WIDTH = Dimensions.get('window').width

const Test = () => {
    return (
        <View>
            {/* CarouselImage */}
            <CarouselComponent />
            {/* Features */}
            <FeaturesComponent />
            <View style={styles.underLineSection} />

            {/* ProductLimit */}
            <ProductLimit />
            <View style={styles.underLineSection} />

            {/* Discount */}
            <ProductDiscount />
            <View style={styles.underLineSection} />

            {/* CarouselImage */}
            <CarouselComponent />
            <View style={styles.underLineSection} />
        </View>
    )
}

const color = '#34A853'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    bodyContainer: {
        flex: 1
    },
    underLineSection: {
        width: WIDTH,
        height: 10,
        marginTop: 10,
        backgroundColor: '#f0f1f2'
    },



    headerContainer: {
        backgroundColor: color,
        justifyContent: 'flex-end',
        // flexDirection: 'row',
        // alignItems: 'center',
        paddingHorizontal: 10,
        elevation: 5
    },
    logo: {
        position: 'absolute',
        top: 5,
        left: 10,
        flex: 1,
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold'
    },
    inputSearchContainer: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 3
    },
    inputSearch: {
        flex: 1,
        color: color,
        height: 40
    },
    iconCartHeader: {
        position: 'absolute',
        top: 10,
        right: 15,
        marginLeft: 10,
        marginTop: 5
    },
    iconBadge: {
        position: 'absolute',
        bottom: 15,
        left: 13,
        zIndex: 10,
        backgroundColor: color,
        width: 19,
        height: 19,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'red'
    }
})

export default Test