let MONGODB_URL
let ReCAPTCHA_SITE_KEY
let ReCAPTCHA_SECRET_KEY
let FRONTEND_URL

if (process.env.NODE_ENV === 'production') {
    MONGODB_URL = `mongodb+srv://mhshuvoit:${process.env.MONGODB_PASSWORD}@cluster1.xbs5i.mongodb.net/mern-facebook-lite?retryWrites=true&w=majority`
    ReCAPTCHA_SITE_KEY = process.env.ReCAPTCHA_SITE_KEY_PROD
    ReCAPTCHA_SECRET_KEY = process.env.ReCAPTCHA_SECRET_KEY_PROD
    FRONTEND_URL = 'https://mern-facebook-lite-mhs.herokuapp.com'
} else {
    MONGODB_URL = `mongodb://localhost:27017/mern-facebook-lite`
    ReCAPTCHA_SITE_KEY = process.env.ReCAPTCHA_SITE_KEY
    ReCAPTCHA_SECRET_KEY = process.env.ReCAPTCHA_SECRET_KEY
    FRONTEND_URL = 'http://localhost:3000'
}

module.exports = {
    MONGODB_URL,
    ReCAPTCHA_SITE_KEY,
    ReCAPTCHA_SECRET_KEY,
    FRONTEND_URL
}