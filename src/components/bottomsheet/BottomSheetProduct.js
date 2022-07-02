import React, { useRef, useMemo, useCallback, forwardRef, useImperativeHandle } from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import SheetContent from './SheetContent'
import { actionOpenBottomSheet, clearBottomSheet } from '../../redux/actions/bottomSheetAction'
import { useSelector, useDispatch } from 'react-redux'



const BottomSheetProduct = ({}, ref) => {

    const dispatch = useDispatch()

    // ref
    const bottomSheetRef = useRef(null);

    // variables
    // const snapPoints = useMemo(() => ['50%'], []);
    const snapPoints = useMemo(() => ['70%', '70%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
        // if(index === 1) {
        //     dispatch(actionSetLoadingBottomSheet())
        // }
        if(index === -1) {
            dispatch(clearBottomSheet())
        }
    }, [])

    // renders
    const renderBackdrop = useCallback(props => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={1}
            pressBehavior={'close'}
        />
    ), [])

    const handleOpenSheet = useCallback((_id) => {
        bottomSheetRef.current?.present()
        dispatch(actionOpenBottomSheet(_id))
    }, [])

    useImperativeHandle(ref, () => ({
        handleOpenSheet: handleOpenSheet
    }))

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            // enableOverDrag={ false }
            enablePanDownToClose
            backdropComponent={renderBackdrop}
            onChange={handleSheetChanges}
        >
            <SheetContent />
        </BottomSheetModal>
    )
}

export default forwardRef(BottomSheetProduct)