import { POST_PRODUCT, POST_SUCCESS, POST_FAILD } from "../actions/types"

import { put, takeLatest, takeEvery, select } from 'redux-saga/effects'
import { createProduct } from "../../api/productApi"

const getStateMyStore = state => state.myStoreReducer

function* postProduct() {
    const { name, des, image, classify, category, price, quantity, transportfee } = yield select(getStateMyStore)
    // console.log({ name, des, image, classify, category, price, quantity, transportfee })
    try {
        const result = yield createProduct({ name, des, image, classify, category, price, quantity, transportfee })
        console.log(result.data)
        yield put({ type: POST_SUCCESS })
    }
    catch(error) {
        console.log(error)
        yield put({ type: POST_FAILD })
    }
}

export function* watchPostProduct() {
    yield takeLatest(POST_PRODUCT, postProduct)
}