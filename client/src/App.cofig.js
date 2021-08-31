const AppConfig = () => {
    let FRONTEND_URL
    let ReCAPTCHA_SITE_KEY

    if (process.env.NODE_ENV === 'production') {
        ReCAPTCHA_SITE_KEY = '6LfXYIYbAAAAAMubzTBtocBF3-ynGKm4FvlvTPB7'
        FRONTEND_URL = 'https://mern-facebook-lite-mhs.herokuapp.com'
    } else {
        ReCAPTCHA_SITE_KEY = '6LfXYIYbAAAAAMubzTBtocBF3-ynGKm4FvlvTPB7'
        FRONTEND_URL = `http://localhost:3000`
    }

    return {
        FRONTEND_URL,
        ReCAPTCHA_SITE_KEY
    }
}

export default AppConfig