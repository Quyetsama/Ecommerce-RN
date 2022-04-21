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

export const addAddress = (address) => (
    {
        type: ADD_ADDRESS,
        address: address
    }
)

export const changeContact = (contact) => (
    {
        type: SET_CONTACT,
        contact: contact
    }
)

export const clearAddress = () => (
    {
        type: CLEAR_ADDRESS
    }
)

export const clearDeliveryAddress = () => (
    {
        type: CLEAR_DELIVERY_ADDRESS
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

export const clearCart = () => (
    {
        type: CLEAR_CART
    }
)