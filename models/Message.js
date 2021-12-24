const {Schema, model} = require('mongoose')

const schema = new Schema({
    chatId: {
        type: String,
        required: true
    },
    fromUsername: {
        type: String,
        required: false
    },
    fromName: {
        type: String,
        required: false
    },
    from: {
        type: String,
        required: true
    },
    toUsername: {
        type: String,
        required: false
    },
    toName: {
        type: String,
        required: false
    },
    to: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        required: true,
        default: false
    },
    sendTime: {
        type: Date,
        required: true
    }
})

module.exports = model('Message', schema)