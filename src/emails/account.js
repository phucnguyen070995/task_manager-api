const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'p070995@gmail.com',
        subject: 'Thank for joining in!',
        text: `Welcome to the app! ${name}. Let me know how get along with the app.`
    })
}

const sendWCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'p070995@gmail.com',
        subject: 'Goodbye my love!',
        text: `Goodbye my love! ${name.toUpperCase()}. Please tell my why you cancelation. Thank you!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendWCancelEmail
}