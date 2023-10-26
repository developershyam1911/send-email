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
app.get('/send-email', async (req, res) => {
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
        from: '"Event Planet 👻"support@eventplanet.in', // sender address
        to: "eventplanet.world@gmail.com", // list of receivers
        subject: "New Enquiry ✔", // Subject line
        text: "New Enquiry received. Login to connect", // plain text body
        html: '<h3>New Enquiry Arrived</h3><p>You can login to admin panel to see this enquiry <a href="https://biz.eventplanet.in/">Click here to redirect</a></p>', // html body
    });
    res.send('Send successfully')
})


app.listen(PORT, () => {
    console.log("Server is Listening on Port ", PORT);
});
