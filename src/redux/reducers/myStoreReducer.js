import { POST_PRODUCT, CLEAR_PRODUCT, SET_NAME_PRODUCT, SET_DES_PRODUCT, SET_CATEGORY_PRODUCT } from "../actions/types"


const initialState = {
    name: '',
    des: '',
    category: {
        _id: '',
        name: ''
    }
}

const myStoreReducer = (state = initialState, action) => {
    // console.log(action)
    switch(action.type) {
        case POST_PRODUCT:
            return {
                ...state
            }
        case CLEAR_PRODUCT:
            return initialState
        case SET_NAME_PRODUCT:
            return {
                ...state,
                name: action.name
            }
        case SET_DES_PRODUCT:
            return {
                ...state,
                des: action.des
            }
        case SET_CATEGORY_PRODUCT:
            return {
                ...state,
                category: {
                    _id: action.category._id,
                    name: action.category.name
                }
            }
        default:
            return {
                ...state
            }
    }
}

export default myStoreReducer