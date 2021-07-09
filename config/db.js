const mongoose = require('mongoose');
const config = require('config');

let connectUrl
if (process.env.NODE_ENV === 'production') {
    connectUrl = `mongodb+srv://mhshuvoit:${process.env.MONGODB_PASSWORD}@cluster1.xbs5i.mongodb.net/mern-facebook-lite?retryWrites=true&w=majority`
} else {
    connectUrl = config.get('localhostURL')
}

const connectDB = () => {
    mongoose.connect(connectUrl, {
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