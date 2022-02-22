import { 
    ADD_TO_CART,
    DELETE_FROM_CART,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY
} from "./types"


export const addToCart = (product) => (
    {
        type: ADD_TO_CART,
        product: product
    }
)

export const deleteFromCart = (_id) => (
    {
        type: DELETE_FROM_CART,
        _id: _id
    }
)

export const inCrease = (_id) => (
    {
        type: INCREASE_QUANTITY,
        _id: _id
    }
)

export const deCrease = (_id) => (
    {
        type: DECREASE_QUANTITY,
        _id: _id
    }
)