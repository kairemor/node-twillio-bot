const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const twilio = require('twilio')

const app = express()
const accountSid = 'ACf7f1a5985ff51521a5fdf13da30dbf45';
const authToken = 'd4d32a1d0980c0211cdb17024e1d301e';
const client = new twilio(accountSid, authToken)

let MessageSchema = new mongoose.Schema({
    phoneNumber: String,
    groupeName: String,
    totalAdults: String,
    totalKids: String
})

let Message = mongoose.model('message', MessageSchema)

app.use(bodyParser.urlencoded({
    extended: false
}))
const url1 = 'mongodb+srv://kairemor:987654321@mongo-proj-qzrmj.mongodb.net/test?retryWrites=true'

const connect = mongoose.connect(url1, {
    useNewUrlParser: true
})
connect.then(() => console.log("connected to database"))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.end()
})

app.post('/inbound', (req, res) => {
    let from_ = req.body.From
    let to = req.body.To
    let body = req.body.Body

    Message.find({
            phoneNumber: req.body.From
        })
        .then(message => {
            console.log(message)
            res.end()
        })
        .catch(err => console.log(err))

})

app.listen(3000, () => console.log("Server listening "))