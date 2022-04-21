import { 
    ADD_TO_CART,
    DELETE_FROM_CART,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    ADD_ADDRESS,
    CLEAR_ADDRESS,
    SET_CONTACT,
    CLEAR_DELIVERY_ADDRESS,
    ADD_VOUCHER,
    DELETE_VOUCHER,
    CLEAR_CART
} from "../actions/types"


const initialState = {
    products: [],
    voucher: null,
    deliveryAddress: {
        address: {
            province: null,
            district: null,
            ward: null,
            selected: 1
        },
        contact: {
            name: '',
            phone: '',
            street: ''
        }
    }
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
            const newProducts = state.products.filter(item => {
                return (
                    item.timestamp !== action.timestamp
                )
            })
            return {
                ...state,
                products: [...newProducts]
            }
        }
        case INCREASE_QUANTITY: {
            const newProducts = [...state.products]
            const index = state.products.findIndex(item => {
                return (
                    item.timestamp === action.timestamp
                )
            })
            newProducts[index].quantity += 1
            return {
                ...state,
                products: [...newProducts]
            }
        }
        case DECREASE_QUANTITY: {
            const newProducts = [...state.products]
            const index = state.products.findIndex(item => {
                return (
                    item.timestamp === action.timestamp
                )
            })
            newProducts[index].quantity -= 1
            return {
                ...state,
                products: [...newProducts]
            }
        }
        case ADD_ADDRESS: {
            return {
                ...state,
                deliveryAddress: {
                    ...state.deliveryAddress,
                    address: action.address
                }
            }
        }
        case CLEAR_ADDRESS: {
            return {
                ...state,
                deliveryAddress: {
                    ...state.deliveryAddress,
                    address: {...initialState.deliveryAddress.address}
                }
            }
        }
        case SET_CONTACT: {
            return {
                ...state,
                deliveryAddress: {
                    ...state.deliveryAddress,
                    contact: {...action.contact}
                }
            }
        }
        case CLEAR_DELIVERY_ADDRESS: {
            return {
                ...state,
                deliveryAddress: {...initialState.deliveryAddress}
            }
        }
        case ADD_VOUCHER: {
            return {
                ...state,
                voucher: action.voucher
            }
        }
        case DELETE_VOUCHER: {
            return {
                ...state,
                voucher: null
            }
        }
        case CLEAR_CART: {
            return {
                ...initialState
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default cartReducer