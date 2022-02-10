import { ADD_TO_CART } from "../actions/types"


const initialState = {
    products: []
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:

            // const newProduct = state.products.filter(item => (
            //     item._id === action.product._id
            //     &&
            //     item
            // ))

            // console.log(newProduct)

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
        default:
            return {
                ...state
            }
    }
}

export default cartReducer