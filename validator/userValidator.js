const validator = require('validator');
const axios = require('axios');

const registerValidator = (user) => {
    const error = {}
    if (!user.name) {
        error.name = "Please provide a name"
    }
    if (!user.username) {
        error.username = "Please provide a username"
    }
    if (!user.email) {
        error.email = "Please provide an email"
    } else if (!validator.isEmail(user.email)) {
        error.email = "Please provide valid email"
    }
    if (!user.password) {
        error.password = "Please provide a password"
    }

    if (!user.token) {
        error.password = "Please fill recaptcha"
    } else {
        axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.ReCAPTCHA_SECRET_KEY}&response=${user.token}`)
            .then((response) => {
                if(response) {
                    error.token = ''
                } else {
                    error.token = 'Invalid recaptcha'
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

const loginValidator = (user) => {
    const error = {}
    if (!user.email) {
        error.email = "Please provide an email"
    } else if (!validator.isEmail(user.email)) {
        error.email = "Please provide valid email"
    }
    if (!user.password) {
        error.password = "Please provide a password"
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = {
    registerValidator,
    loginValidator
}