const jwt = require('jsonwebtoken')
const User = require('../Model/User')

const authenthicate = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        try {
            const user = jwt.verify(token, process.env.SECRET_KEY)
            User.findOne({ email: user.email })
                .then(function (response) {
                    if (response.email === user.email) {
                        req.user = response
                        next()
                    } else {
                        res.status(401).json({
                            message: 'Invalid credentials'
                        })
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        } catch (e) {
            res.status(401).json({
                message: 'Invalid credentials'
            })
        }
    } else {
        res.status(401).json({
            message: 'Please login'
        })
    }
}

module.exports = authenthicate