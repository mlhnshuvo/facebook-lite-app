const AppConfig = () => {
    let FRONTEND_URL
    let ReCAPTCHA_SITE_KEY

    if (process.env.NODE_ENV === 'production') {
        ReCAPTCHA_SITE_KEY = '6LdjlocbAAAAABWpq-813GMixkCv27OBlcdWJi3F'
        FRONTEND_URL = 'https://facebook-lite-app-mhs.herokuapp.com'
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