import { all } from 'redux-saga/effects'

import { watchPostProduct } from './productSagas'


export default function* rootSaga() {
    yield all([
        watchPostProduct()
    ])
}