const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 5
    },
    avatar: [String],
    isActive: {
        type: Boolean,
        default: false
    },
    activeToken: String,
    
    bio: String,
    address: {
        city: String,
        country: String,
        postCode: String,
    },
    school:String,
    relationship: String,
    skills: String,
    social: [
        {
            url: String
        }
    ]
}, {
    timestamps: true
})

const userModel = model('user', userSchema)

module.exports = userModel