const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
const PORT = 4000
app.get('/', (req, res) => {
    res.send({
        status: 'ok',
    })
})
app.post('/send-email', async (req, res) => {
    const { name,sender_email,receiver_email,subject,msg } = req.body
    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
            user: 'support@eventplanet.in',
            pass: 'Event@123'
        }
    });

    const info = await transporter.sendMail({
        from: `${name} ${sender_email}`, // sender address
        to: receiver_email, // list of receivers
        subject:subject, // Subject line
        // text: "New Enquiry received. Login to connect", // plain text body
        html: msg
    });
    res.send({status:'success'})
})


app.listen(PORT, () => {
    console.log("Server is Listening on Port ", PORT);
});
