const mongoose = require('mongoose')


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
alienSchema.query.byTech = function(tech) {
    return this.where({tech: tech});
}

module.exports = mongoose.model('Alien',alienSchema)