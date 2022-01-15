import { createStore, combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import myStoreReducer from './reducers/myStoreReducer'


const rootReducer = combineReducers({
    authReducer,
    myStoreReducer
})

// const configureStore = () => createStore(rootReducer)

export default rootReducer