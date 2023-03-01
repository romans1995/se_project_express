const mongoose = require('mongoose');
// const reg = `^(http|https):\/\/(www\.)?[a-zA-Z0-9-._~:?#[\]@!$&'()*+,;=]+#?$`
const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // use the regular expression from the user schema to validate the link
                return /(https?:\/\/.*\.(?:png|jpg))/i.test(v);
            },
            message: props => `${props.value} is not a valid link!`
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // reference the User model
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Card = mongoose.model('card', cardSchema);

module.exports = Card;