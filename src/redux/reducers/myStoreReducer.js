import { 
    POST_PRODUCT, 
    CLEAR_PRODUCT, 
    SET_NAME_PRODUCT, 
    SET_DES_PRODUCT, 
    SET_CATEGORY_PRODUCT,
    SET_VALUE_CLASSIFY_PRODUCT,
    REMOVE_VALUE_CLASSIFY_PRODUCT,
    SET_VALUE_PRICE,
    SET_VALUE_QUANTITY
} from "../actions/types"


const initialState = {
    name: '',
    des: '',
    category: {
        _id: null,
        name: null
    },
    classify: {},
    price: null,
    quantity: null
}

const myStoreReducer = (state = initialState, action) => {
    console.log(action.type)
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
        case SET_VALUE_CLASSIFY_PRODUCT:
            return {
                ...state,
                classify: {...action.value}
            }
        case REMOVE_VALUE_CLASSIFY_PRODUCT:
            return {
                ...state,
                classify: {},
                price: null,
                quantity: null
            }
        case SET_VALUE_PRICE:
            return {
                ...state,
                price: action.price
            }
        case SET_VALUE_QUANTITY:
            return {
                ...state,
                quantity: action.quantity
            }
        default:
            return {
                ...state
            }
    }
}

export default myStoreReducer