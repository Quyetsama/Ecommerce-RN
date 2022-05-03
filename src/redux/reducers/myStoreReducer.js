import { 
    POST_PRODUCT, 
    CLEAR_PRODUCT,
    SET_IMAGE_PRODUCT,
    SET_NAME_PRODUCT, 
    SET_DES_PRODUCT, 
    SET_CATEGORY_PRODUCT,
    SET_VALUE_CLASSIFY_PRODUCT,
    REMOVE_VALUE_CLASSIFY_PRODUCT,
    SET_VALUE_PRICE,
    SET_VALUE_QUANTITY,
    SET_VALUE_TRANSPORTFEE,
    POST_SUCCESS,
    POST_FAILD
} from "../actions/types"


const initialState = {
    image: [],
    name: '',
    des: '',
    category: {
        _id: null,
        name: null
    },
    classify: {},
    price: null,
    quantity: null,
    transportfee: null,
    post_success: null
}

const myStoreReducer = (state = initialState, action) => {
    // console.log(action.type)
    switch(action.type) {
        case POST_PRODUCT:
            return {
                ...state
            }
        case POST_SUCCESS:
            return {
                ...state,
                post_success: true
            }
        case POST_FAILD:
            return {
                ...state,
                post_success: false
            }
        case 'SET_POST_NULL':
            return {
                ...state,
                post_success: null
            }
        case CLEAR_PRODUCT:
            return initialState
        case SET_IMAGE_PRODUCT:
            return {
                ...state,
                image: action.image
            }
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
        case SET_VALUE_TRANSPORTFEE:
            return {
                ...state,
                transportfee: action.transportFee
            }
        default:
            return {
                ...state
            }
    }
}

export default myStoreReducer