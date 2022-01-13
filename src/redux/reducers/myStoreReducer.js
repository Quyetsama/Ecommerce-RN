import { SET_NAME_PRODUCT, SET_DES_PRODUCT } from "../actions/types"


const initialState = {
    name: '',
    des: ''
}

const myStoreReducer = (state = initialState, action) => {
    // console.log(action)
    switch(action.type) {
        case SET_NAME_PRODUCT:
            return {
                ...state,
                name: action.name
            }
        default:
            return {
                ...state
            }
    }
}

export default myStoreReducer