import { createStore, combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import myStoreReducer from './reducers/myStoreReducer'
import cartReducer from './reducers/cartReducer'


const rootReducer = combineReducers({
    authReducer,
    myStoreReducer,
    cartReducer
})

// const configureStore = () => createStore(rootReducer)

export default rootReducer