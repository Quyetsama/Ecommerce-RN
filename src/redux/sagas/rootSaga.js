import { all } from 'redux-saga/effects'

import { watchPostProduct } from './productSagas'
import { watchPostLogin } from './loginSaga'
import { watchPostSignUp } from './signUpSaga'


export default function* rootSaga() {
    yield all([
        watchPostProduct(),
        watchPostLogin(),
        watchPostSignUp()
    ])
}