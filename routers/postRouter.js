const router = require('express').Router();
const {
    createPost,
    deletePost,
    getAllPost,
    getMyPost,
    likePost,
    commentsPost,
    replyComments
} = require('../controllers/postController')
const authenthicate = require('../middlewares/authenthicate')
const uploader = require('../middlewares/fileUpload')

router.post('/post/create', authenthicate, uploader.single('image'), createPost)
router.delete('/post/:id', deletePost)
router.get('/post/allpost', getAllPost)
router.get('/post/mypost/:username', authenthicate, getMyPost)
router.post('/post/like/:id', authenthicate, likePost)
router.post('/post/comments/:id', authenthicate, commentsPost)
router.post('/post/comments/:id/:replyid', authenthicate, replyComments)

module.exports = router