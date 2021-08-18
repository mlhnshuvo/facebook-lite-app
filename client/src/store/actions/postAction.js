import * as Types from './Types'
import Axios from 'axios'
import alertAction from './alertAction'

export const getPost = () => dispatch => {
    Axios.get('/api/post/allpost')
        .then((res) => {
            dispatch({
                type: Types.GET__POST,
                payload: res.data.post
            })
            dispatch({
                type: Types.PERFORMSEARCH
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

export const getSinglePost = (id) => dispatch => {
    Axios.get('/api/post/' + id)
        .then((res) => {
            dispatch({
                type: Types.GET__SINGLE__POST,
                payload: res.data.post
            })
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: Types.GET__SINGLE__POST__ERROR,
                payload: err
            })
        })
}

export const getMyPost = (username) => dispatch => {
    Axios.get('/api/post/mypost/' + username)
        .then((res) => {
            dispatch({
                type: Types.GET__MY__POST,
                payload: res.data.post
            })
            dispatch({
                type: Types.PERFORMSEARCH
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
            dispatch({
                type: Types.PERFORMSEARCH
            })
            dispatch(alertAction('Post create sucessfully', 'primary'))
        })
        .catch((err) => {
            dispatch({
                type: Types.CREATE__POST__ERROR,
                payload: err.message
            })
            dispatch(alertAction(err.message, 'danger'))
        })
}

export const likePost = (id) => dispatch => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    Axios.put('/api/post/like/' + id, options)
        .then((res) => {
            dispatch({
                type: Types.LIKE__POST,
                payload: res.data
            })
            dispatch({
                type: Types.PERFORMSEARCH
            })
        })
        .catch((err) => {
            dispatch({
                type: Types.LIKE__POST__ERROR,
                payload: err.message
            })
            dispatch(alertAction(err.message, 'danger'))
        })
}

export const commentPost = (body, id) => dispatch => {
    Axios.post('/api/post/comments/' + id, { body })
        .then((res) => {
            dispatch({
                type: Types.COMMNENT__POST,
                payload: res.data
            })
            dispatch({
                type: Types.PERFORMSEARCH
            })
        })
        .catch((err) => {
            dispatch({
                type: Types.COMMNENT__POST__ERROR,
                payload: err.message
            })
            dispatch(alertAction(err.message, 'danger'))
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
            dispatch({
                type: Types.PERFORMSEARCH
            })
        })
        .catch((err) => {
            dispatch({
                type: Types.COMMNENT__POST__REPLY__ERROR,
                payload: err.message
            })
            dispatch(alertAction(err.message, 'danger'))
        })
}

export const deletePost = (id, username) => dispatch => {
    Axios.delete('/api/post/' + id + '/' + username)
        .then((res) => {
            dispatch({
                type: Types.POST_DELETE,
                payload: res.data
            })
            dispatch({
                type: Types.PERFORMSEARCH
            })
            dispatch(alertAction('Delete sucessfully', 'danger'))
        })
        .catch((err) => {
            dispatch({
                type: Types.POST_DELETE__ERROR,
                payload: err.message
            })
            dispatch(alertAction(err.message, 'danger'))
        })
}

export const searchTerm = (value) => dispatch => {
    dispatch({
        type: Types.SEARCHTERM,
        payload: value
    })
    dispatch({
        type: Types.PERFORMSEARCH
    })
}