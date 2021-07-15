import * as Types from '../actions/Types'

const init = {
    user: null,
    errors: null,
    isLoading: true
}

const profileReducer = (state = init, action) => {
    switch (action.type) {
        case Types.GET__ME: {
            return {
                ...state,
                user: action.payload.user,
                isLoading: false
            }
        }
        case Types.GET__ME__ERROR: {
            return {
                ...state,
                errors: action.payload
            }
        }
        case Types.GET__USER: {
            return {
                ...state,
                user: action.payload.user,
                isLoading: false
            }
        }
        case Types.GET__USER__ERROR: {
            return {
                ...state,
                errors:action.payload
            }
        }
        case Types.UPLOAD__PIC: {
            return {
                ...state,
                user: action.payload,
                isLoading: false
            }
        }
        case Types.UPLOAD__PIC__ERROR: {
            return {
                ...state,
                errors: action.payload
            }
        }
        case Types.EDIT__PROFILE: {
            return {
                ...state,
                user: action.payload.user,
                isLoading: false
            }
        }
        case Types.EDIT__PROFILE__ERROR: {
            return {
                ...state,
                errors: action.payload
            }
        }

        case Types.DELETE__PROFILE: {
            return {
                ...state,
                user: action.payload.user
            }
        }
        case Types.DELETE__PROFILE__ERROR: {
            return {
                ...state,
                errors: action.payload
            }
        }

        case Types.DELETE__PROFILE__PIC: {
            return {
                ...state,
                user: action.payload.user
            }
        }
        case Types.DELETE__PROFILE__PIC__ERROR: {
            return {
                ...state,
                errors: action.payload
            }
        }
        default: return state
    }
}

export default profileReducer