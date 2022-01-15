import { POST_PRODUCT } from "../actions/types"

import { put, takeLatest, takeEvery, select } from 'redux-saga/effects'

const getStateMyStore = state => state.myStoreReducer

function* postProduct() {
    const state = yield select(getStateMyStore)
    console.log(state)
}

export function* watchPostProduct() {
    yield takeLatest(POST_PRODUCT, postProduct)
}