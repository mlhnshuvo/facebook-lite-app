const serverError = (res) => {
    return res.status(400).json({
        message: 'Server error occurred'
    })
}

module.exports = serverError