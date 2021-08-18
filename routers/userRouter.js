const router = require('express').Router();
const {
    register,
    login,
    activeController,
    updateUser,
    profilePicUpload,
    matchEmail,
    resetPasswordController,
    getAllUser,
    getMe,
    getProfile,
    deleteProfile,
    deleteProfilePic
} = require('../controllers/userController')
const fileUpload = require('../middlewares/fileUpload')
const authenthicate = require('../middlewares/authenthicate')

router.post('/user/register', register)
router.post('/user/login', login)
// router.get('/google/callback', function (req, res) {
//     console.log(req, res)
// })
router.get('/user/active/:token', activeController)
router.put('/user/update', authenthicate, updateUser)
router.post('/user/uploadpic', authenthicate, fileUpload.single('avatar'), profilePicUpload)
router.post('/user/matchemail', matchEmail)
router.post('/user/changepass/:token', resetPasswordController)
router.get('/user/allusers', getAllUser)
router.get('/user/me', authenthicate, getMe)
router.get('/user/:username', authenthicate, getProfile)
router.delete('/user/:username', authenthicate, deleteProfile)
router.delete('/user/pic/:index', authenthicate, deleteProfilePic)

module.exports = router