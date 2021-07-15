import * as Types from './Types'
import Axios from 'axios'
import jwt_decode from "jwt-decode";

export const getMe = () => dispatch => {
    Axios.get('/api/user/me')
        .then(function (res) {
            dispatch({
                type: Types.GET__ME,
                payload: {
                    user: res.data.user
                }
            })
        })
        .catch((err) => {
            dispatch({
                type: Types.GET__ME__ERROR,
                payload: {
                    errors: err.response
                }
            })
        })
}

export const getUser = (username) => dispatch => {
    const token = localStorage.getItem('token')
    if (token) {
        var decode = jwt_decode(token);
        const finalusername = username ? username : decode.username
        Axios.get('/api/user/' + finalusername)
            .then(function (res) {
                dispatch({
                    type: Types.GET__USER,
                    payload: {
                        user: res.data.user
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: Types.GET__USER__ERROR,
                    payload: {
                        errors: err.response
                    }
                })
            })
    }
}

export const fileUpload = (fd) => dispatch => {
    Axios.post('/api/user/uploadpic', fd)
        .then(res => {
            dispatch({
                type: Types.UPLOAD__PIC,
                payload: res.data.respons
            })
        })

        .catch((err) => {
            dispatch({
                type: Types.UPLOAD__PIC__ERROR,
                payload: {
                    errors: err.response
                }
            })
        })
}

export const editProfile = user => dispatch => {
    Axios.put('/api/user/update', user)
        .then(res => {
            dispatch({
                type: Types.EDIT__PROFILE,
                payload: {
                    user: res.data.response
                }
            })
        })
        .catch((err) => {
            dispatch({
                type: Types.EDIT__PROFILE__ERROR,
                payload: {
                    errors: err.response
                }
            })
        })
}

export const deleteProfile = (username) => dispatch => {
    Axios.delete('/api/user/' + username)
        .then(res => {
            dispatch({
                type: Types.DELETE__PROFILE,
                payload: {
                    user: res.data.user
                }
            })
        })
        .catch((err) => {
            dispatch({
                type: Types.DELETE__PROFILE__ERROR,
                payload: {
                    errors: err.response
                }
            })
        })
}

export const deleteProfilePic = (index, history, username) => dispatch => {
    Axios.delete('/api/user/pic/' + index)
        .then(res => {
            dispatch({
                type: Types.DELETE__PROFILE__PIC,
                payload: {
                    user: res.data.response
                }
            })
            history.push('/' + username);
        })
        .catch((err) => {
            dispatch({
                type: Types.DELETE__PROFILE__PIC__ERROR,
                payload: {
                    errors: err.response
                }
            })
        })
}