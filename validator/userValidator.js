const validator = require('validator');
const axios = require('axios');
const { ReCAPTCHA_SECRET_KEY } = require('../prodOrDev')

const registerValidator = (user) => {
    const error = {}
    if (!user.name) {
        error.name = "Please provide a name"
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
        error.token = "Please fill recaptcha"
    } else {
        axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${ReCAPTCHA_SECRET_KEY}&response=${user.token}`)
            .then((response) => {
                if (response.data.success) {
                    error.token = null
                } else {
                    error.token = 'Invalid recaptcha'
                }
            })
            .catch(() => {
                error.token = 'Invalid recaptcha'
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