import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderStore from '../../components/storescreen/HeaderStore'
import { violet } from '../../helpers/configs'
import Dialog from 'react-native-dialog'
import UnderLineSection from '../../components/UnderLineSection'
import NoName from '../../components/storescreen/NoName'



const DialogADD = ({ visible, defaultValue, handleCancel, onPressOK }) => {

    const [text, setText] = useState('')

    useEffect(() => {
        setText(defaultValue)
    }, [defaultValue])

    const handleOK = () => {
        onPressOK(defaultValue, text)
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

const ItemClassify = ({ label, isSelected, handleSelected, isUpdate, handleRemove }) => {
    return (
        <View>
            {isUpdate ? (<MaterialCommunityIcons 
                            style={{ position: 'absolute', top: -10, right: 0, backgroundColor: '#fff', zIndex: 10 }} 
                            name={'close-circle-outline'} size={20} color={violet}
                            onPress={() => handleRemove() }
                        />)
                        : null
            }
            <TouchableOpacity 
                onPress={ handleSelected } 
                activeOpacity={0.8} 
                style={ isSelected ? styles.itemContainerActive : styles.itemContainerInActive } 
            >
                <Text style={[ styles.label, { color: isSelected ? violet : '#000' } ]}>{ label }</Text>
            </TouchableOpacity> 
        </View>
    )
}

const SectionClassify = ({ label, defaultData, removeSection, handleLabelChange }) => {

    const [isUpdate, setIsUpdate] = useState(false)
    const [dialog, setDialog] = useState({
        visible: false,
        value: ''
    })
    const [data, setData] = useState(defaultData)
    const [selected, setSelected] = useState([])

    // Chọn màu sắc ...
    const handleSelected = (element) => {
        if(selected.includes(element.index)) {
            setSelected(selected.filter(item => item !== element.index))
        }
        else {
            setSelected([...selected, element.index])
        }
    }

    // Remove Item
    const handleRemove = (element) =>{
        setData(data.filter(item => item.index !== element.index))
        setSelected(selected.filter(item => item !== element.index))
        setDialog({ visible: false, value: '' })
    }

    // Sửa
    const handleEditItem = (element) => {
        setDialog({ 
            visible: true,
            value: element.value
        })
    }

    // Click Ok dialog (Sửa)
    const handleConfirmEditItem = (oldValue, newValue) => {
        let newData = data
        if(newValue !== '') {
            for(let i = 0; i < newData.length; i++) {
                if(newData[i].value === oldValue) {
                    newData[i].value = newValue
                    break
                }
            }
            setData(newData)
            // setData([...data.filter(item => item !== oldValue), newValue])
        }
        setDialog({ visible: false, value: '' })
    }

    // Click Ok dialog (Thêm)
    const handleADD = (defaultValue, text) => {
        const found = data.some(el => el.value === text)
        if (!found) setData([...data, { index: Date.now(), value: text }])

        // if(!data.includes(text)) {
        //     setData([...data, { index: data.length, value: text }])
        // }
        setDialog({ visible: false, value: '' })
    }

    // Click Cancel dialog
    const handleCancel = () => {
        setDialog({ visible: false, value: '' })
    }

    // handle Thêm when isUpdate
    const handleADDWhenIsUpdate = () => {
        setDialog({ ...dialog, visible: true })
        setIsUpdate(false)
    }


    console.log(label)
    return(
        <View style={ styles.sectionContainer }>

            <DialogADD 
                visible={ dialog.visible } 
                defaultValue={ dialog.value } 
                handleCancel={ handleCancel } 
                onPressOK={ isUpdate ? handleConfirmEditItem : handleADD } 
            />

            <View style={ styles.topContainer }>
                {isUpdate ? (<MaterialCommunityIcons onPress={ removeSection } name={'minus-circle'} size={20} color={violet} />) : null}
                <TextInput
                    editable={ isUpdate } 
                    style={ styles.titleContainer }
                    value={ label }
                    onChangeText={text => handleLabelChange(text)}
                />
                <TouchableOpacity onPress={() => setIsUpdate(!isUpdate)}>
                    <Text style={ styles.updateContainer }>{ isUpdate ? 'Xong' : 'Sửa'}</Text>
                </TouchableOpacity>
            </View>

            <View style={ styles.botContainer }>
                {data.map((item, index) => (
                    <ItemClassify 
                        key={ index } label={ item.value } 
                        isSelected={ selected.includes(item.index) } 
                        handleSelected={() => isUpdate ? handleEditItem(item) : handleSelected(item)}
                        isUpdate={ isUpdate }
                        handleRemove={ () => handleRemove(item) }
                    />
                ))}
                <ItemClassify label={'+ Thêm'} handleSelected={ handleADDWhenIsUpdate } />
            </View>
        </View>
    )
}


const data1 = {
    label: 'Màu sắc',
    data: [
        {
            index: Date.now() + '1',
            value: 'Đen'
        },
        {
            index: Date.now() + '2',
            value: 'Trắng'
        }
    ]
}
const data2 = {
    label: 'Kích cỡ',
    data: [
        {
            index: Date.now() + '1',
            value: 'S'
        },
        {
            index: Date.now() + '2',
            value: 'M'
        },
        {
            index: Date.now() + '3',
            value: 'L'
        }
    ]
}

const ClassifyProduct = ({ navigation }) => {

    const [classify1, setClassify1] = useState(data1)
    const [classify2, setClassify2] = useState(data2)

    const addClassify = () => {
        if(classify1 === null) {
            if(classify2 === null) {
                setClassify1({
                    label: '',
                    data: []
                })
            }
            else {
                setClassify1(classify2)
                setClassify2({
                    label: '',
                    data: []
                })
            }
        }
        else {
            setClassify2({
                label: '',
                data: []
            })
        }
    }

    // console.log(classify1 === null, classify2 === null)

    return (
        <View style={ styles.container }>
            <HeaderStore label={'Phân loại hàng'} goBack={() => navigation.goBack()} />
            
            <ScrollView keyboardShouldPersistTaps='handled'>
                {classify1 !== null ? <SectionClassify label={ classify1.label } defaultData={ classify1.data } removeSection={() => setClassify1(null)} handleLabelChange={(text) => setClassify1({...classify1, label: text})} /> : null}
                <UnderLineSection />
                {classify2 !== null ? <SectionClassify label={ classify2.label } defaultData={ classify2.data } removeSection={() => setClassify2(null)} handleLabelChange={(text) => setClassify2({...classify2, label: text})} /> : null}
                <UnderLineSection />
                {(classify1 === null || classify2 === null) ? <NoName icon={'add-circle-outline'} colorIcon={ violet } label={'Thêm phân loại hàng'} hideRequired hideIconChevron onPress={ addClassify } /> : null }           
            </ScrollView>
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
    }
})

export default ClassifyProduct