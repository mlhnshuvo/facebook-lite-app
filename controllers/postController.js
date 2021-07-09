const User = require('../Model/User')
const Post = require('../Model/Post')
const serverError = require('../utils/serverError')

function createPost(req, res) {
    const { email } = req.user
    const { path } = req.file
    const { body, privacy } = req.body
    User.findOne({ email })
        .then(function (response) {
            const post = {
                author: {
                    authorId: response._id,
                    name: response.name,
                    username: response.username,
                    image: response.avatar[0]
                },
                body,
                image: '/' + path,
                privacy,
                likes: [],
                comments: []
            }
            new Post(post).save()
                .then(function (post) {
                    res.status(200).json({
                        message: 'Post created successfully',
                        post
                    })
                })
                .catch(function () {
                    serverError(res)
                })
        })
        .catch(function () {
            serverError(res)
        })
}

const getAllPost = (req, res) => {
    Post.find()
        .then(function (post) {
            res.status(200).json({
                post
            })
        })
        .catch(function () {
            serverError(res)
        })
}

const getMyPost = (req, res) => {
    const { username } = req.params
    Post.find({ "author.username": username })
        .then(function (post) {
            res.status(200).json({
                post
            })
        })
        .catch(function () {
            serverError(res)
        })
}

const deletePost = (req, res) => {
    const postId = req.params.id
    Post.findOneAndDelete({ _id: postId })
        .then(function (post) {
            res.status(200).json({
                post
            })
        })
        .catch(function () {
            serverError(res)
        })
}

const likePost = (req, res) => {
    const { _id, name } = req.user
    const postId = req.params.id
    const author = {
        _id
    }
    Post.findOne({ _id: postId })
        .then(function (result) {
            const results = { ...result._doc }
            if (results.likes.length === 0) {
                result.likes.push(author)
                result.save()
                res.status(200).json({
                    message: "Liked",
                    result
                })
            } else {
                results.likes.forEach((like) => {
                    if (like._id.toString() === _id.toString()) {
                        const removeIndex = results.likes.findIndex((like) => like._id.toString() === _id.toString())
                        result.likes.splice(removeIndex, 1);
                        result.save()
                        res.status(200).json({
                            message: "You have already liked",
                            result
                        })
                    } else {
                        result.likes.push(author)
                        result.save()
                        res.status(200).json({
                            message: "Liked",
                            result
                        })
                    }
                })
            }
        })
        .catch(function () {
            serverError(res)
        })
}

const commentsPost = (req, res) => {
    const { email } = req.user
    const postId = req.params.id
    const { body } = req.body
    User.findOne({ email })
        .then((result) => {
            const comments = {
                author: {
                    authorId: result._id,
                    name: result.name,
                    image: result.avatar[0]
                },
                body
            }
            Post.findOne({ _id: postId })
                .then((response) => {
                    response.comments.unshift(comments)
                    response.save()
                    res.status(200).json({
                        message: "Your comments successfully done",
                        response
                    })
                })
                .catch(function () {
                    serverError(res)
                })
        })
        .catch(function () {
            serverError(res)
        })
}

const replyComments = (req, res) => {
    const { email } = req.user
    const { id, replyid } = req.params
    const { body } = req.body
    console.log(body)
    User.findOne({ email })
        .then((result) => {
            const comments = {
                author: {
                    authorId: result._id,
                    name: result.name,
                    image: result.avatar[0]
                },
                body
            }
            Post.findOne({ _id: id })
                .then(function (result) {
                    const findComment = result.comments.find(el => {
                        return el._id.toString() === replyid.toString()
                    })
                    findComment.replyComments.unshift(comments)
                    result.save()
                    res.status(200).json({
                        message: "Your comments successfully done",
                        result
                    })
                })
                .catch(function () {
                    serverError(res)
                })
        })
        .catch(function () {
            serverError(res)
        })
}

module.exports = {
    createPost,
    deletePost,
    getAllPost,
    getMyPost,
    likePost,
    commentsPost,
    replyComments
}