import * as Types from '../actions/Types'

const init = {
    post: [],
    errors: null,
    isLoading: true
}

const postReducer = (state = init, action) => {
    switch (action.type) {
        case Types.GET__POST: {
            return {
                ...state,
                post: action.payload,
                errors: null,
                isLoading: false
            }
        }
        case Types.GET__POST__ERROR: {
            return {
                ...state,
                errors: action.payload,
                isLoading: true
            }
        }
        case Types.GET__MY__POST: {
            return {
                ...state,
                post: action.payload,
                errors: null,
                isLoading: false
            }
        }
        case Types.GET__MY__POST__ERROR: {
            return {
                ...state,
                errors: action.payload,
                isLoading: true
            }
        }
        case Types.LIKE__POST: {
            const postState = { ...state }
            const findIndex = postState.post.findIndex(post => post._id === action.payload.result._id)
            postState.post[findIndex] = action.payload.result
            return postState
        }
        case Types.LIKE__POST__ERROR: {
            return {
                ...state,
                errors: action.payload,
                isLoading: false
            }
        }
        case Types.COMMNENT__POST: {
            const postState = { ...state }
            const findIndex = postState.post.findIndex(post => post._id === action.payload.response._id)
            postState.post[findIndex] = action.payload.response
            return postState
        }
        case Types.COMMNENT__POST__ERROR: {
            return {
                ...state,
                errors: action.payload,
                isLoading: true
            }
        }
        case Types.COMMNENT__POST__REPLY: {
            const postState = { ...state }
            const findIndex = postState.post.findIndex(post => post._id === action.payload.result._id)
            postState.post[findIndex] = action.payload.result
            return postState
        }
        case Types.COMMNENT__POST__REPLY__ERROR: {
            return {
                ...state,
                errors: action.payload,
                isLoading: true
            }
        }
        default: return state
    }
}

export default postReducer