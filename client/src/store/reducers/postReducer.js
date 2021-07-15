import * as Types from '../actions/Types'

const init = {
    post: [],
    performSearch: [],
    errors: null,
    isLoading: true,
    searchTerm: ''
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
        case Types.GET__SINGLE__POST: {
            return {
                ...state,
                performSearch: [action.payload],
                errors: null,
                isLoading: false
            }
        }
        case Types.GET__SINGLE__POST__ERROR: {
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

        case Types.CREATE__POST: {
            const postState = { ...state }
            postState.post.push(action.payload.post)
            return postState
        }
        case Types.CREATE__POST__ERROR: {
            return {
                ...state,
                errors: action.payload
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
        case Types.POST_DELETE: {
            const states = { ...state }
            const post = states.post.filter(el => el._id !== action.payload.post._id)
            return {
                ...state,
                post
            }
        }
        case Types.POST_DELETE__ERROR: {
            return {
                ...state,
                errors: action.payload
            }
        }
        case Types.SEARCHTERM: {
            return {
                ...state,
                searchTerm: action.payload
            }
        }
        case Types.PERFORMSEARCH: {
            const states = { ...state }
            const post = states.post.filter(el => el.body.toLowerCase()
                .includes(states.searchTerm.toLowerCase()))
            return {
                ...state,
                performSearch: post.reverse()
            }
        }
        default: return state
    }
}

export default postReducer