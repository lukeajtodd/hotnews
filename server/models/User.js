const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;
const shortid = require('shortid');

const UserSchema = new Schema({
    id: {
        type: String,
        default: shortid.generate(),
        hashKey: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            global: true,
            project: true
        }
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = TrackstarUser = dynamoose.model('users', UserSchema, {
    update: process.env.ENVIRONMENT == 'development' ? true : false
});
