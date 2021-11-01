import * as Types from './Types'
import Axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from "jwt-decode";
import alartAction from './alertAction'

export const registerUser = (user, history) => dispatch => {
    if (user.token) {
        Axios.post('/api/user/register', user)
            .then((response) => {

                console.log(response.data);
                dispatch({
                    type: Types.REGISTER__USER,
                    payload: {
                        user: response.data
                    }
                })
                history.push("/");
                setAuthToken(response.data.token)
                localStorage.setItem("token", response.data.token)
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: Types.ERROR__USER,
                    payload: {
                        errors: err.response
                    }
                })
            })
    } else {
        dispatch(alartAction('Please fill recaptcha', 'danger'))
    }
}

export const loginUser = (user, history) => dispatch => {
    Axios.post('/api/user/login', user)
        .then((response) => {
            dispatch({
                type: Types.LOGIN__USER,
                payload: {
                    user: response.data
                }
            })
            history.push("/");
            setAuthToken(response.data.token)
            localStorage.setItem("token", response.data.token)
        })
        .catch((err) => {
            dispatch({
                type: Types.ERROR__USER,
                payload: {
                    errors: err.response
                }
            })
            dispatch(alartAction('You are not user or you didn\'t active your account yet. Please check your email and try again', 'danger', 10000))
        })
}

export const getAllUsers = () => dispatch => {
    Axios.get('/api/user/allusers')
        .then(function (res) {
            dispatch({
                type: Types.GET__ALL__USERS,
                payload: {
                    users: res.data
                }
            })
            dispatch(isAuthenticated())
        })
        .catch((err) => {
            dispatch({
                type: Types.GET__ALL__USERS__ERROR,
                payload: {
                    errors: err.response
                }
            })
        })

}

export const findEmail = (user) => dispatch => {
    Axios.post('/api/user/matchemail', user)
        .then((response) => {
            dispatch(alartAction(response.data.message, 'primary'))
        })
        .catch(() => {
            dispatch(alartAction('You are not user in this application', 'danger'))
        })
}

export const resetPass = (password, token, history, msg) => dispatch => {
    console.log(password)
    Axios.post('/api/user/changepass/' + token, { password })
        .then((response) => {
            dispatch(alartAction(response.data.message, 'primary'))
            history.push("/");
        })
        .catch(() => {
            dispatch(alartAction(msg, 'danger'))
        })
}

export const isAuthenticated = () => dispatch => {
    const token = localStorage.getItem('token')
    if (token) {
        var decoded = jwt_decode(token);
        var dateNow = new Date();

        if (decoded.exp * 1000 < dateNow.getTime()) {
            dispatch({
                type: Types.ISAUTHENTICATION,
                payload: {
                    isAuthenticated: false
                }
            })
            dispatch(alartAction('Token expired! Please login again', 'danger'))
        } else {
            dispatch({
                type: Types.ISAUTHENTICATION,
                payload: {
                    isAuthenticated: true,
                    username: decoded.username
                }
            })
        }
    } else {
        dispatch({
            type: Types.ISAUTHENTICATION,
            payload: {
                isAuthenticated: false
            }
        })
        dispatch(alartAction('Please login again', 'danger'))
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('token')
    dispatch({
        type: Types.LOGOUT
    })
}