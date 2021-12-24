const {Schema, model} = require('mongoose')

const schema = new Schema({
    username: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        required: true,
        default: false
    },
    lng: {
        type: Number,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lastSeen: {
        type: Number,
        required: true,
    },
    registerDate: {
        type: Date,
        required: true
    }
})

module.exports = model('User', schema)