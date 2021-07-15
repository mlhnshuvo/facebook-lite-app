import * as Types from '../actions/Types'

const alertReducer = (state = {}, action) => {
    switch (action.type) {
        case Types.GET__ALART: {
            return {
                msg: action.payload.msg,
                color: action.payload.color
            }
        }
        case Types.REMOVE__ALART: {
            return {
                state: null
            }
        }
        default: return state
    }
}

export default alertReducer