const User = require('../Model/User')
const { registerValidator, loginValidator } = require('../validator/userValidator')
const bcrypt = require('bcryptjs')
const serverError = require('../utils/serverError')
const jwt = require('jsonwebtoken');
// const gravatar = require('gravatar');
const sendMailer = require('../mail/transporter')
const { activeAccount, welcomeMessage, resetPassword } = require('../mail/templates')

const register = (req, res) => {
    const {
        name,
        username,
        email,
        password,
        token
    } = req.body;

    const validator = registerValidator({ name, username, email, password, token })
    if (!validator.isValid) {
        return res.status(400).json(validator.error)
    } else {
        User.findOne({ email })
            .then((response) => {
                if (response) {
                    res.status(400).json({
                        message: 'Already registered'
                    })
                } else {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(password, salt, function (err, hash) {
                            if (err) {
                                serverError(res)
                            } else {
                                // const avatar = gravatar.url(email, {s: '200', r: 'pg', d: '404'});
                                const token = jwt.sign({ email, name, username }, process.env.SECRET_KEY, { expiresIn: '1h' })
                                const user = {
                                    name,
                                    username,
                                    email,
                                    password: hash,
                                    activeToken: token,
                                    avatar: [],

                                    bio: '',
                                    address: { city: '', country: '', postCode: '' },
                                    school: '',
                                    relationship: '',
                                    skills: '',
                                    social: [{ url: '' }]
                                }
                                const newUser = new User(user)
                                newUser.save()
                                    .then((user) => {
                                        res.status(201).json({
                                            user,
                                            token,
                                            message: 'Successfully registered'
                                        })
                                        // sendMailer(email, name, activeAccount(token))
                                    })
                                    .catch(err => {
                                        serverError(res)
                                    })
                            }
                        });
                    });
                }
            })
            .catch(() => {
                serverError(res)
            })
    }
}

const login = (req, res) => {
    const { email, password } = req.body
    const validator = loginValidator({ email, password })

    if (!validator.isValid) {
        res.status(400).json({
            message: validator.error
        })
    } else {
        User.findOne({ email })
            .then(function (user) {
                if (user) {
                    if (user.isActive) {
                        bcrypt.compare(password, user.password, function (err, response) {
                            if (response) {
                                const token = jwt.sign({
                                    email: user.email,
                                    name: user.name,
                                    username: user.username
                                }, process.env.SECRET_KEY, { expiresIn: '1h' })
                                res.status(200).json({
                                    message: 'Successfully login',
                                    token
                                })
                            } else {
                                res.status(401).json({
                                    message: 'Password does not match'
                                })
                            }
                        });
                    } else {
                        res.status(401).json({
                            message: 'You didn\'t active your account yet. Please check your email and try again'
                        })
                    }
                } else {
                    res.status(404).json({
                        message: 'User not found'
                    })
                }
            })
            .catch(() => {
                serverError(res)
            })
    }
}

const activeController = (req, res) => {
    try {
        const { token } = req.params;
        const { email } = jwt.verify(token, process.env.SECRET_KEY)
        User.findOneAndUpdate({ email }, { $set: { isActive: true, activeToken: '' } }, { new: true })
            .then((response) => {
                res.status(200).json({
                    message: "Congratulations! Your account is active"
                })
                sendMailer(email, response.name, welcomeMessage())
            })
            .catch(() => {
                serverError(res)
            })
    } catch {
        res.status(404).json({
            message: "You are too late. Please try again"
        })
    }
}

const updateUser = (req, res) => {
    const { email } = req.user
    const {
        name,
        bio,
        city,
        country,
        postCode,
        school,
        relationship,
        skills,
        social
    } = req.body
    const updateUser = {
        name,
        bio,
        address: {
            city,
            country,
            postCode,
        },
        school,
        relationship,
        skills,
        social
    }
    User.findOneAndUpdate({ email }, { $set: updateUser }, { new: true })
        .then((response) => {
            res.status(200).json({
                message: 'Successfully updated',
                response: response
            })
        })
        .catch(() => {
            serverError(res)
        })
}

const profilePicUpload = (req, res) => {
    const { email } = req.user
    try {
        const file = `/` + req.file.path
        User.findOne({ email })
            .then((response) => {
                response.avatar.unshift(file)
                response.save()
                    .then((respons) => {
                        res.status(200).json({
                            message: 'Successfully profile pic upload',
                            respons
                        })
                    })
                    .catch(() => {
                        serverError(res)
                    })
            })
            .catch(() => {
                serverError(res)
            })
    } catch (err) {
        serverError(res)
    }
}

const matchEmail = (req, res) => {
    const { email } = req.body
    User.find()
        .then((response) => {
            response.forEach(element => {
                if (element.email === email) {
                    const token = jwt.sign({
                        email: element.email
                    }, process.env.SECRET_KEY, { expiresIn: '1h' })
                    sendMailer(email, element.name, resetPassword(token))
                    res.status(200).json({
                        message: 'Please check your email!'
                    })
                } else {
                    res.status(401).json({
                        message: 'You are not user in this application'
                    })
                }
            });
        })
        .catch(() => {
            serverError(res)
        })
}

const resetPasswordController = (req, res) => {
    const { token } = req.params
    const { email } = jwt.verify(token, process.env.SECRET_KEY)
    const { password } = req.body
    console.log(password, token)
    User.find()
        .then((response) => {
            response.forEach(element => {
                if (element.email === email) {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(password, salt, function (err, hash) {
                            if (err) {
                                serverError(res)
                            } else {
                                element.password = hash
                                element.save()
                                res.status(200).json({
                                    message: 'Password reset successfully'
                                })
                            }
                        });
                    });
                } else {
                    res.status(401).json({
                        message: 'You are not user in this application'
                    })
                }
            });
        })
        .catch(() => {
            serverError(res)
        })
}

const getAllUser = (req, res) => {
    User.find()
        .then(user => {
            res.status(200).json({
                user
            })
        })
        .catch(() => {
            serverError(res)
        })
}

const getMe = (req, res) => {
    const { email } = req.user
    User.findOne({ email })
        .then(user => {
            res.status(200).json({
                user
            })
        })
        .catch(() => {
            serverError(res)
        })
}

const getProfile = (req, res) => {
    const { username } = req.params
    User.findOne({ username })
        .then(user => {
            res.status(200).json({
                user
            })
        })
        .catch(() => {
            serverError(res)
        })
}

module.exports = {
    register,
    login,
    activeController,
    updateUser,
    profilePicUpload,
    matchEmail,
    resetPasswordController,
    getAllUser,
    getMe,
    getProfile
}