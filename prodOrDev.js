let MONGODB_URL
let ReCAPTCHA_SITE_KEY
let ReCAPTCHA_SECRET_KEY
let FRONTEND_URL


    MONGODB_URL = `mongodb+srv://mlhnshuvo:${process.env.MONGODB_PASSWORD}@cluster.vg1yn.mongodb.net/facebook-lite-app-mhs?retryWrites=true&w=majority`
    ReCAPTCHA_SITE_KEY = process.env.ReCAPTCHA_SITE_KEY_PROD
    ReCAPTCHA_SECRET_KEY = process.env.ReCAPTCHA_SECRET_KEY_PROD
    FRONTEND_URL = 'https://facebook-lite-app-mhs.herokuapp.com'


module.exports = {
    MONGODB_URL,
    ReCAPTCHA_SITE_KEY,
    ReCAPTCHA_SECRET_KEY,
    FRONTEND_URL
}