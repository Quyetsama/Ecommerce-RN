import { 
    HANDLE_OPEN_BOTTOM_SHEET,
    SET_LOADING_BOTTOM_SHEET,
    CLEAR_BOTTOM_SHEET
} from "../actions/types"


const initialState = {
    _id: null,
    isLoading: false
}

const bottomSheetReducer = (state = initialState, action) => {
    switch(action.type) {
        case HANDLE_OPEN_BOTTOM_SHEET:
            return {
                ...state,
                isLoading: true,
                _id: action.payload._id
            }
        case SET_LOADING_BOTTOM_SHEET:
            return {
                ...state,
                isLoading: !state.isLoading
            }
        case CLEAR_BOTTOM_SHEET:
            return {
                ...initialState
            }
        default:
            return {
                ...state
            }
    }
}

export default bottomSheetReducer