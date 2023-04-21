const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/AlienDBex'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})


app.use(express.json())

const alienSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    sub: {
        type: Boolean,
        required: true,
        default: false
    }
})

alienSchema.query.byName = function(name){
    return this.where({name: new RegExp(name, 'i')});
};
alienSchema.query.byTech = function(tech){
    return this.where({tech: new RegExp(tech, 'i')});
};

const Alien = mongoose.model('Alien', alienSchema);


const alienRouter = require('./routes/aliens')(Alien);
app.use('/aliens',alienRouter)

app.listen(9000, () => {
    console.log('Server started')
})