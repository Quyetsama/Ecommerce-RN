import { 
    ADD_TO_CART,
    DELETE_FROM_CART,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    ADD_VOUCHER,
    DELETE_VOUCHER
} from "./types"


export const addToCart = (product) => (
    {
        type: ADD_TO_CART,
        product: product
    }
)

export const deleteFromCart = (timestamp) => (
    {
        type: DELETE_FROM_CART,
        timestamp: timestamp
    }
)

export const inCrease = (timestamp) => (
    {
        type: INCREASE_QUANTITY,
        timestamp: timestamp
    }
)

export const deCrease = (timestamp) => (
    {
        type: DECREASE_QUANTITY,
        timestamp: timestamp
    }
)

export const addVoucher = (voucher) => (
    {
        type: ADD_VOUCHER,
        voucher: voucher
    }
)

export const deleteVoucher = () => (
    {
        type: DELETE_VOUCHER
    }
)