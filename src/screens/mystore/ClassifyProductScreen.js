import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'

import HeaderStore from '../../components/storescreen/HeaderStore'
import { violet } from '../../helpers/configs'
import Dialog from 'react-native-dialog'
import UnderLineSection from '../../components/UnderLineSection'
import NoName from '../../components/storescreen/NoName'



const DialogADD = ({ visible, defaultValue, onPressCancel, onPressOK, type }) => {

    const [text, setText] = useState('')

    useEffect(() => {
        setText(defaultValue)
    }, [defaultValue])

    const handleOK = () => {
        const newValue = text.trim()

        if(newValue === '') return

        if(type === 'edit') {
            onPressOK(defaultValue, newValue)
        }
        else {
            onPressOK(newValue)
        }
        setText('')
    }

    const handleCancel = () => {
        onPressCancel()
        setText('')
    }

    return (
        <Dialog.Container visible={ visible }>
            <Dialog.Title>Chỉnh sửa phân loại hàng</Dialog.Title>
            <Dialog.Input
                autoFocus
                value={ text }
                onChangeText={text => setText(text)}
            />
            <Dialog.Button label="Cancel" onPress={ handleCancel } />
            <Dialog.Button label="Ok" onPress={ handleOK } />
        </Dialog.Container>
    )
}

const ItemClassify = ({ label, isUpdate, onPress, handleRemove }) => {
    return (
        <View>
            {isUpdate 
                ? 
                (<MaterialCommunityIcons 
                    style={{ position: 'absolute', top: -10, right: 0, backgroundColor: '#fff', zIndex: 10 }} 
                    name={'close-circle-outline'} size={20} color={violet}
                    onPress={ handleRemove }
                />)
                : 
                null
            }
            <TouchableOpacity 
                onPress={ onPress } 
                activeOpacity={0.8} 
                style={ styles.itemContainerActive } 
            >
                <Text style={[ styles.label, { color: violet } ]}>{ label }</Text>
            </TouchableOpacity> 
        </View>
    )
}

const SectionClassify = ({ label, defaultData, removeClassify, handleAddValueClassify, handleChangeNameClassify, handleRemoveValueClassify, handleEditValueClassify }) => {

    const [isUpdate, setIsUpdate] = useState(false)
    const [dialog, setDialog] = useState({
        visible: false,
        value: ''
    })
    const [nameClassify, setNameClassify] = useState(label)

    // useEffect(() => {
    //     setNameClassify(label)
    // }, [label])

    // Click Cancel dialog
    const onPressCancel = () => {
        setDialog({ visible: false, value: '' })
    }

    const ADD = () => {
        setIsUpdate(false)
        setDialog({ ...dialog, visible: true })
    }

    const confirmADD = (value) => {
        handleAddValueClassify(value)
        setDialog({ ...dialog, visible: false })
    }

    const EDIT = (value) => {
        setDialog({ visible: true, value: value })
        console.log(value)
    }

    const confirmEDIT = (oldValue, newValue) => {
        handleEditValueClassify(oldValue, newValue)
        setDialog({ ...dialog, visible: false })
    }

    const onPressUpdate = () => {
        if(isUpdate === true) {
            handleChangeNameClassify(nameClassify)
        }
        setIsUpdate(!isUpdate)
    }

    // console.log(nameClassify)
    return(
        <View style={ styles.sectionContainer }>

            <DialogADD 
                visible={ dialog.visible } 
                defaultValue={ dialog.value } 
                onPressCancel={ onPressCancel } 
                onPressOK={ isUpdate ? confirmEDIT : confirmADD }
                type={ isUpdate ? 'edit' : null }
            />

            <View style={ styles.topContainer }>
                {isUpdate
                    ? <MaterialCommunityIcons onPress={ removeClassify } name={'minus-circle'} size={20} color={violet} />
                    : null
                }
                <TextInput
                    editable={ isUpdate } 
                    style={ styles.titleContainer }
                    placeholder='Phân loại'
                    value={ nameClassify }
                    onChangeText={text => setNameClassify(text)}
                />
                <TouchableOpacity onPress={ onPressUpdate }>
                    <Text style={ styles.updateContainer }>{ isUpdate ? 'Xong' : 'Sửa'}</Text>
                </TouchableOpacity>
            </View>

            <View style={ styles.botContainer }>
                {defaultData.map((item, index) => (
                    <ItemClassify 
                        key={ index } label={ item } 
                        // handleEditItem={() => isUpdate ? handleEditItem(item) : null}
                        onPress={() => isUpdate ? EDIT(item) : null}
                        isUpdate={ isUpdate }
                        handleRemove={() => handleRemoveValueClassify(item)}
                    />
                ))}
                <ItemClassify 
                    label={'+ Thêm'} 
                    onPress={ ADD } 
                /> 
            </View>
        </View>
    )
}

const ClassifyProduct = ({ route, navigation }) => {

    // const Class = useSelector(state => state.myStoreReducer.classify)

    const deepClone = JSON.parse(JSON.stringify(route.params.classify))

    const dispatch = useDispatch()
    const [classify, setClassify] = useState({
        generalClassification: deepClone.generalClassification || [],
        detailClassification: deepClone.detailClassification || []
    })

    const setPrice_Quantity = () => {
        navigation.navigate('PriceQuantity', {
            classify: classify
        })
    }



    const handleAddValueClassify = (position, value) => {
        const newClassify = {...classify}
        newClassify.generalClassification[position].data = [...new Set([...newClassify.generalClassification[position].data, value])]   

        const newItem = newClassify.generalClassification[position].data[newClassify.generalClassification[position].data.length - 1]


        if(newClassify.generalClassification.length === 1) {
            newClassify.detailClassification.push({
                type: [newItem],
                price: null,
                quantity: null
            })
        }
        else if(newClassify.generalClassification.length === 2) {
            if(position === 0) {
                newClassify.generalClassification[1].data.map((item, index) => {
                    newClassify.detailClassification.push({
                        type: [newItem, item],
                        price: null,
                        quantity: null
                    })
                })
            }
            else if(position === 1) {
                newClassify.generalClassification[0].data.map((item, index) => {
                    newClassify.detailClassification.push({
                        type: [item, newItem],
                        price: null,
                        quantity: null
                    })
                })
            }
        }
        

        setClassify(newClassify)
    }

    const handleRemoveValueClassify = (position, value) => {
        const newClassify = {...classify}
        newClassify.generalClassification[position].data = newClassify.generalClassification[position].data.filter(item => item !== value)

        for(let i = 0; i < newClassify.detailClassification.length; i++) {
            if(newClassify.detailClassification[i].type[position] === value) {
                newClassify.detailClassification.splice(i, 1)
                i--
            }
        }
        
        setClassify(newClassify)
    }

    const handleEditValueClassify = (position, oldValue, newValue) => {
        const newClassify = {...classify}
        newClassify.generalClassification[position].data.map((item, index) => {
            if(item === oldValue ) {
                newClassify.generalClassification[position].data[index] = newValue
            }
        })

        newClassify.detailClassification.map((item, index) => {
            if(item.type[position] === oldValue) {
                newClassify.detailClassification[index].type[position] = newValue
            }
        })

        setClassify(newClassify)
    }

    const handleChangeNameClassify = (position, value) => {
        const newClassify = {...classify}
        newClassify.generalClassification[position].label = value
        setClassify(newClassify)
    }

    const addClassify = () =>{
        const newGeneralClassification = [...classify.generalClassification]

        const newClassify = {
            generalClassification: [
                ...newGeneralClassification,
                {
                    id: Date.now().toString(),
                    label: 'Phân loại',
                    data: ['Loại 1']
                }
            ],
            detailClassification: []
        }
        newClassify.generalClassification[0].data.map((item0, index0) => {
            newClassify.generalClassification.length === 1
            ?
            newClassify.detailClassification.push({
                type: [item0],
                price: null,
                quantity: null
            })
            :
            newClassify.generalClassification[1].data.map((item1, index1) => {
                newClassify.detailClassification.push({
                    type: [item0, item1],
                    price: null,
                    quantity: null
                })
            })
        })


        setClassify(newClassify)
    }

    const removeClassify = (position) =>{
        const newClassify = {...classify}
        
        newClassify.generalClassification = newClassify.generalClassification.filter((item, index) => (index !== position))
        newClassify.detailClassification = []

        if(newClassify.generalClassification.length === 1) {
            newClassify.generalClassification[0].data.map((item, index) => {
                newClassify.detailClassification.push({
                    type: [item],
                    price: null,
                    quantity: null
                })
            })
        }

        setClassify(newClassify)
    }

    const isValid = () => {

        let isValid = true

        classify.generalClassification.map((item, index) => {
            if((item.label.trim() === '') || (item.data.length === 0)) {
                isValid = false
            }
        })

        return (
            isValid && classify.generalClassification.length !== 0
        )
    }

    return (
        <View style={ styles.container }>
            <HeaderStore 
                label={'Phân loại hàng'} 
                goBack={() => { 
                    navigation.goBack()
                    if(classify.generalClassification.length === 0) {
                        dispatch({ type: 'REMOVE_VALUE_CLASSIFY_PRODUCT' })
                    }
                }} 
            />

            <FlatList
                keyboardShouldPersistTaps='handled'
                data={classify.generalClassification}
                renderItem={({item, index}) => (
                    <SectionClassify
                        key={item.id}
                        label={ item.label } 
                        defaultData={ item.data }
                        removeClassify={() => removeClassify(index)}
                        handleAddValueClassify={(value) => handleAddValueClassify(index, value)}
                        handleChangeNameClassify={(value) => handleChangeNameClassify(index, value)}
                        handleRemoveValueClassify={(value) => handleRemoveValueClassify(index, value) }
                        handleEditValueClassify={(oldValue, newValue) => handleEditValueClassify(index, oldValue, newValue) }
                    />
                )}
                ListFooterComponent={
                    (classify.generalClassification.length < 2)
                        ? <NoName
                            onPress={ addClassify }
                            icon={'add-circle-outline'} 
                            colorIcon={ violet } 
                            label={'Thêm phân loại hàng'} 
                            hideRequired 
                            hideIconChevron 
                        /> 
                        : null 
                     
                }
            />
            <TouchableOpacity
                disabled={ !isValid() }
                style={[ styles.btnNext, { opacity: isValid() ? 1 : 0.5 } ]} 
                activeOpacity={0.8} 
                onPress={ setPrice_Quantity }
            >
                <Text style={ styles.next }>Tiếp theo</Text>
            </TouchableOpacity>
        </View>
    )
}

const itemContainer = {
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 20,
    marginRight: 10
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sectionContainer: {
        backgroundColor: '#fff'
    },
    topContainer: {
        flexDirection: 'row',
        // paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        alignItems: 'center'
    },
    titleContainer: {
        flex: 1,
        color: '#000',
        fontWeight: '500'
    },
    updateContainer:{
        color: violet
    },

    botContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 20,
        paddingLeft: 15
    },
    itemContainerInActive: {
        ...itemContainer,
        borderColor: '#969696'
    },
    itemContainerActive: {
        ...itemContainer,
        borderColor: violet
    },
    label: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        // color: '#000'
    },
    btnNext: {
        position: 'absolute',
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

export default ClassifyProduct