const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/AlienDBex'

const app = express()
const cors = require('cors')

app.use(cors());

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})


app.use(express.json())

const alienSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sub: {
        type: Boolean,
        required: true,
        default: false
    }
})

alienSchema.query.byName = function(email){
    return this.where({email: new RegExp(email, 'i')});
};
alienSchema.query.byTech = function(password){
    return this.where({password: new RegExp(password, 'i')});
};

const Alien = mongoose.model('Alien', alienSchema);


const alienRouter = require('./routes/aliens')(Alien);
app.use('/aliens',alienRouter)

app.listen(4000, () => {
    console.log('Server started')
})