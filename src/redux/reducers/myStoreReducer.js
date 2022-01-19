import { 
    POST_PRODUCT, 
    CLEAR_PRODUCT, 
    SET_NAME_PRODUCT, 
    SET_DES_PRODUCT, 
    SET_CATEGORY_PRODUCT,
    SET_VALUE_CLASSIFY_PRODUCT,
    REMOVE_VALUE_CLASSIFY_PRODUCT,
    ADD_VALUE_CLASSIFY0_PRODUCT,
    ADD_VALUE_CLASSIFY1_PRODUCT
} from "../actions/types"


const initialState = {
    name: '',
    des: '',
    category: {
        _id: '',
        name: ''
    },
    classify: {}
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
                classify: {}
            }
        case ADD_VALUE_CLASSIFY0_PRODUCT:
            // var newClassify0 = state.classify
            // newClassify0[0].data = [ ...new Set([...newClassify0[0].data, action.value]) ]
            var newClassify0 = state.classify
            newClassify0[0].data = [...newClassify0[0].data, action.value]
            return {
                ...state,
                classify: [...newClassify0]
            }
        case ADD_VALUE_CLASSIFY1_PRODUCT:
            var newClassify1 = state.classify
            newClassify1[1].data = [ ...new Set([...newClassify1[1].data, action.value]) ]
            return {
                ...state,
                classify: [...newClassify1]
            }
        default:
            return {
                ...state
            }
    }
}

export default myStoreReducer