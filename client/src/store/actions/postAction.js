import * as Types from './Types'
import Axios from 'axios'

export const getPost = () => dispatch => {
    Axios.get('/api/post/allpost')
        .then((res) => {
            dispatch({
                type: Types.GET__POST,
                payload: res.data.post
            })
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: Types.GET__POST__ERROR,
                payload: err
            })
        })
}

export const getMyPost = (username) => dispatch => {
    Axios.get('/api/post/mypost/' + username)
        .then((res) => {
            console.log(res.data)
            dispatch({
                type: Types.GET__MY__POST,
                payload: res.data.post
            })
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: Types.GET__MY__POST__ERROR,
                payload: err
            })
        })
}

export const createPost = (post) => dispatch => {
    Axios.post('/api/post/create', post)
        .then((res) => {
            dispatch({
                type: Types.CREATE__POST,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: Types.CREATE__POST__ERROR,
                payload: err
            })
        })
}

export const likePost = (id) => dispatch => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    Axios.post('/api/post/like/' + id, options)
        .then((res) => {
            dispatch({
                type: Types.LIKE__POST,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: Types.LIKE__POST__ERROR,
                payload: err
            })
        })
}

export const commentPost = (body, id) => dispatch => {
    Axios.post('/api/post/comments/' + id, { body })
        .then((res) => {
            dispatch({
                type: Types.COMMNENT__POST,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: Types.COMMNENT__POST__ERROR,
                payload: err
            })
        })
}


export const commentPostReply = (body, id, replyId) => dispatch => {
    Axios.post('/api/post/comments/' + id + '/' + replyId, { body })
        .then((res) => {
            console.log(res.data)
            dispatch({
                type: Types.COMMNENT__POST__REPLY,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: Types.COMMNENT__POST__REPLY__ERROR,
                payload: err
            })
        })
}