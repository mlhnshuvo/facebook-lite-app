function activeAccount(url) {
    return (
        `<div style="text-align:center; background-color: #1c2c3a; height:200px; margin:auto; margin-top:30px">
        <div>
            <h2 style="color:rgb(198, 198, 219)">Please active your account</h2>
            <a style="color:rgb(198, 198, 219)" href=${process.env.FRONTEND_URL}/active/${url}>Click Here</a>
        </div>
    </div>
        `
    )
}

function welcomeMessage() {
    return (
        `<div style="text-align:center; background-color: #1c2c3a; height:200px; margin:auto; margin-top:30px">
        <div>
            <h2 style="color:rgb(198, 198, 219)">Welcome to our Application</h2>
        </div>
    </div>
        `
    )
}

const resetPassword = (token) => {
    return (
        `<div style="text-align:center; background-color: #1c2c3a; height:200px; margin:auto; margin-top:30px">
        <div>
            <h2 style="color:rgb(198, 198, 219)">Reset password</h2>
            <a style="color:rgb(198, 198, 219)" href=${process.env.FRONTEND_URL}/changepass/${token}>Reset Password</a>
        </div>
    </div>
        `
    )
}

module.exports = {
    activeAccount,
    welcomeMessage,
    resetPassword
}