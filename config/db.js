const mongoose = require('mongoose');
const {MONGODB_URL} = require('../prodOrDev');

const connectDB = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => {
            console.log('Connected to database')
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = connectDB