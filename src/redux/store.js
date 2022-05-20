import { createStore, combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import myStoreReducer from './reducers/myStoreReducer'
import cartReducer from './reducers/cartReducer'
import notifyReducer from './reducers/notifyReducer'


const rootReducer = combineReducers({
    authReducer,
    myStoreReducer,
    cartReducer,
    notifyReducer
})

// const configureStore = () => createStore(rootReducer)

export default rootReducer