import * as Types from '../actions/Types'

const init = {
    isAuthenticated: false,
    user: null,
    username: '',
    errors: null,
    isLoading: true
}

const userReducer = (state = init, action) => {
    switch (action.type) {
        case Types.REGISTER__USER: {
            return {
                ...state,
                isAuthenticated: Object.keys(action.payload.user).length > 0,
                errors: null
            }
        }
        case Types.ERROR__USER: {
            console.log(action.payload.errors.data);
            return {
                ...state,
                errors: action.payload.errors.data
            }
        }
        case Types.LOGIN__USER: {
            return {
                ...state,
                isAuthenticated: Object.keys(action.payload.user).length > 0,
                errors: null
            }
        }
        case Types.GET__ALL__USERS: {
            return {
                ...state,
                user: action.payload.users.user,
                isLoading: false
            }
        }
        case Types.GET__ALL__USERS__ERROR: {
            return {
                ...state,
                errors: action.payload.errors
            }
        }
        case Types.ISAUTHENTICATION: {
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                username: action.payload.username
            }
        }
        case Types.LOGOUT: {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                errors: null
            }
        }
        default: return state
    }
}

export default userReducer