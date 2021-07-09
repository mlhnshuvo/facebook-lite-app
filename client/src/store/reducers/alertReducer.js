import * as Types from '../actions/Types'

const alertReducer = (state = [], action) => {
    const { type, payload } = action
    switch (type) {
        case Types.GET__ALART: {
            return [...state, payload]
        }
        case Types.REMOVE__ALART: {
            return state.filter(al => al.id !== payload)
        }
        default: return state
    }
}

export default alertReducer