require('dotenv').config();
const accountSid = process.env.TWILIO_ACOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const numberTo = process.env.NUMBER_TO;
const numberFrom = process.env.NUMBER_FROM;
const client = require('twilio')(accountSid, authToken);
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/sms', (req, res) => {
    const text = req.body.textToMaor;
    client.messages.create({
        body: text,
        from: numberFrom,
        to: numberTo
    }).then(message => console.log('Message sent successfully', message.body));
    // checking if this branch works
    // this should work
    // more changes
    res.redirect('/success')
});

app.get('/success', (req, res) => {
    res.render('success');
})

app.listen(process.env.PORT || 3000);