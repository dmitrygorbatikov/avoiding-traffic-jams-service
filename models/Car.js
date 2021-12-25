const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    updatedDate: {
        type: Date,
        required: true
    },
    registerDate: {
        type: Date,
        required: true
    }
})

module.exports = model('Car', schema)