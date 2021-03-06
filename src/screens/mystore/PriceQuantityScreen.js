import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import HeaderStore from '../../components/storescreen/HeaderStore'
import { violet } from '../../utils/configs'
import { useDispatch, useSelector } from 'react-redux'
import { addValueClassifyProduct, setValuePrice, setValueQuantity } from '../../redux/actions/myStoreAction'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomDialog = () => {
    return (
        <KeyboardAvoidingView style={{
            flex: 1,
            width: windowWidth,
            height: windowHeight,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
            zIndex: 10
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={{
                backgroundColor: '#fff',
                width: windowWidth - 100,
                height: windowHeight / 3,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TextInput 
                    autoFocus
                    placeholder='input'
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const Similar = ({ onPress }) => {
    return (
        <View style={ styles.similarContainer }>
            <View style={ styles.leftContainer }>
                <Text style={ styles.textLeft }>Đặt đồng giá, số lượng hàng cho tất cả phân loại</Text>
            </View>
            <TouchableOpacity
                onPress={ onPress }
            >
                <Text style={ styles.textRight }>Thay Đổi hàng Loạt</Text>
            </TouchableOpacity>
        </View>
    )
}

const HeaderColumn = () => {
    return (
        <View style={ styles.headerColumn }>
            <View style={ styles.firstColumn }>
                <Text style={{ color: '#000' }}>Phân loại hàng</Text>
            </View>
            <View style={ styles.secondColumn }>
                <Text style={{ color: '#000' }}>Giá</Text>
            </View>
            <View style={ styles.thirdColumn }>
                <Text style={{ color: '#000' }}>Kho hàng</Text>
            </View>
        </View>
    )
}

const RowItem = ({ type, price, quantity, handleChangePriceItem, handleChangeQuantityItem }) => {

    const convertVND = (value) => {
        return (
            value.toLocaleString('vi', {style : 'currency', currency : 'VND'})
        )
    }

    return (
        <View style={ styles.rowItemContainer }>
            <View style={ styles.firstRow }>
                <Text style={{ color: '#000', fontSize: 15 }}>{ type }</Text>
            </View>
            <View style={ styles.secondRow }>
                <TextInput
                    value={ price + '' }
                    onChangeText={text => handleChangePriceItem(text)}
                    style={ styles.input }
                    placeholder={ convertVND(0) }
                    keyboardType="numeric"
                />
            </View>
            <View style={ styles.thirdRow }>
                <TextInput
                    value={ quantity + '' }
                    onChangeText={text => handleChangeQuantityItem(text)}
                    style={ styles.input }
                    placeholder='0'
                    keyboardType="numeric"
                />
            </View>
        </View>
    )
}

const PriceQuantity = ({ route, navigation }) => {

    const deepClone = JSON.parse(JSON.stringify(route.params.classify))

    const [changeAll, setChangeAll] = useState(false)
    const [classify, setClassify] = useState(deepClone)
    const dispatch = useDispatch()

    const handleSave = () => {
        // console.log(classify)
        dispatch(addValueClassifyProduct(classify))
        dispatch(setValuePrice(Math.max.apply(Math, classify.detailClassification.map(o => o.price))))
        dispatch(setValueQuantity(classify.detailClassification.reduce((sum, cur) => sum + cur.quantity , 0)))
        navigation.pop(2)
    }

    const handleChangePriceItem = (position, value) => {
        const newClassify = {...classify}
        newClassify.detailClassification[position].price = +value
        setClassify(newClassify)
    }

    const handleChangeQuantityItem = (position, value) => {
        const newClassify = {...classify}
        newClassify.detailClassification[position].quantity = +value
        setClassify(newClassify)
    }

    const isValid = () => {
        let isValid = true

        for(let i = 0; i < classify.detailClassification.length; i++) {
            if(!classify.detailClassification[i].price || !classify.detailClassification[i].quantity) {
                isValid = false
                break
            }
        }

        return isValid
    }

    // console.log(classify)
    return (
        <View style={ styles.container }>
            <HeaderStore label={'Giá - Số lượng'} goBack={() => navigation.goBack()} />

            {
                changeAll
                ? <CustomDialog />
                : null
            }

            <Similar onPress={() => setChangeAll(true)} />
            <HeaderColumn />
            
            <FlatList 
                data={classify.detailClassification}
                renderItem={({item, index}) => (
                    <RowItem 
                        key={ index }
                        type={ item.type.length < 2 ? item.type[0] : (item.type[0] + ' - ' + item.type[1]) }
                        price={ item.price || '' }
                        quantity={ item.quantity || '' }
                        handleChangePriceItem={(value) => handleChangePriceItem(index, value)}
                        handleChangeQuantityItem={(value) => handleChangeQuantityItem(index, value)}
                    />
                )}
            />
                
            <TouchableOpacity 
                disabled={ !isValid() }
                style={[ styles.btnNext, { opacity: isValid() ? 1 : 0.5 } ]} 
                activeOpacity={0.9}
                onPress={ handleSave }
            >
                <Text style={ styles.next }>Lưu</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    similarContainer: {
        width: windowWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff'
    },
    leftContainer: {
        width: (windowWidth / 3) * 2 - 20
    },
    rightContainer: {
        width: (windowWidth / 3) - 20
    },
    textLeft: {
        fontSize: 15,
        color: '#969696'
    },
    textRight: {
        fontSize: 15,
        color: violet,
        textAlign: 'center'
    },

    headerColumn: {
        flexDirection: 'row',
        padding: 10
    },
    firstColumn: {
        width: windowWidth / 2 - 10
    },
    secondColumn: {
        width: windowWidth / 4 - 5
    },
    thirdColumn: {
        width: windowWidth / 4 - 5
    },

    rowItemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    firstRow: {
        width: windowWidth / 2 - 10
    },
    secondRow: {
        width: windowWidth / 4 - 5
    },
    thirdRow: {
        width: windowWidth / 4 - 5
    },
    input: {
        // borderBottomWidth: 1, 
        // borderBottomColor: violet, 
        backgroundColor: '#f2f2f2',
        marginRight: 15,
        paddingHorizontal: 10
    },

    btnNext: {
        // position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: violet,
        padding: 15
    },
    next: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    }
})

export default PriceQuantity