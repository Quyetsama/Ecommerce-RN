import { 
    ADD_TO_CART,
    DELETE_FROM_CART,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY
} from "../actions/types"


const initialState = {
    products: []
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART: {

            const newProducts = [...state.products]

            const findProduct = newProducts.find((e, i) => {
                if((e._id === action.product._id) && (JSON.stringify(e.selected) === JSON.stringify(action.product.selected))) {
                    newProducts[i].quantity += action.product.quantity
                    return true
                }
            })

            if(findProduct) {
                return {
                    ...state,
                    products: [...newProducts]
                }
            }

            return {
                ...state,
                products: [...state.products, action.product]
            }
        }
        case DELETE_FROM_CART: { 
            const newProducts = state.products.filter(item => item._id !== action._id)
            return {
                ...state,
                products: [...newProducts]
            }
        }
        case INCREASE_QUANTITY: {
            const newProducts = [...state.products]
            const index = state.products.findIndex(item => item._id === action._id)
            newProducts[index].quantity += 1
            return {
                ...state,
                products: [...newProducts]
            }
        }
        case DECREASE_QUANTITY: {
            const newProducts = [...state.products]
            const index = state.products.findIndex(item => item._id === action._id)
            newProducts[index].quantity -= 1
            return {
                ...state,
                products: [...newProducts]
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default cartReducer