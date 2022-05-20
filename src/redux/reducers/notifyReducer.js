import { 
    SET_COUNT_NOTIFY,
    DECREASE_COUNT_NOTIFY,
    INCREASE_COUNT_NOTIFY
} from "../actions/types"


const initialStateNotify = {
    count: 0
}

const notifyReducer = (state = initialStateNotify, action) => {
    switch(action.type) {
        case SET_COUNT_NOTIFY:
            return {
                ...state,
                count: action.count
            }
        case DECREASE_COUNT_NOTIFY:
            return {
                ...state,
                count: state.count - 1
            }
        case INCREASE_COUNT_NOTIFY:
            return {
                ...state,
                count: state.count + 1
            }
        default:
            return {
                ...state
            }
    }
}

export default notifyReducer