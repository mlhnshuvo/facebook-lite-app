const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER, // generated ethereal user
        pass: process.env.GMAIL_USER_PASSWORD, // generated ethereal password
    }
})

const sendMailer = (email, name, templateName) => {
    return (
        transporter.sendMail({
            from: process.env.GMAIL_USER, // sender address
            to: email, // list of receivers
            subject: `Hello, ${name}`, // Subject line
            html: templateName, // html body
        })
    )
}

module.exports = sendMailer
