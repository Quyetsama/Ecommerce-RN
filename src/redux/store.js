import { createStore, combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import myStoreReducer from './reducers/myStoreReducer'
import cartReducer from './reducers/cartReducer'
import notifyReducer from './reducers/notifyReducer'
import signUpReducer from './reducers/signUpReducer'
import homeReducer from './reducers/homeReducer'
import bottomSheetReducer from './reducers/bottomSheetReducer'


const rootReducer = combineReducers({
    authReducer,
    myStoreReducer,
    cartReducer,
    notifyReducer,
    // signUpReducer
    homeReducer,
    bottomSheetReducer
})

// const configureStore = () => createStore(rootReducer)

export default rootReducer