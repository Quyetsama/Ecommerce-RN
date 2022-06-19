import {
    SET_CATEGORY,
    SET_REFRESHING,
    INCREASE_PAGE
} from "../actions/types"


const initialState = {
    refreshing: true,
    category: {
        id: 'all',
        page: 1
    },
    error: null
}

const homeReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_REFRESHING:
            return {
                ...state,
                refreshing: !state.refreshing,
                category: {
                    id: 'all',
                    page: 1
                }
            }            
        case SET_CATEGORY:
            return {
                ...state,
                category: {
                    id: action.payload.id,
                    page: action.payload.page
                }
            }            
        case INCREASE_PAGE:
            return {
                ...state,
                category: {
                    ...state.category,
                    page: state.category.page + 1
                }
            }            
        default:
            return {
                ...state
            }
    }
}

export default homeReducer