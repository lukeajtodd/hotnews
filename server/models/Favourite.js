const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;
const shortid = require('shortid');

const FavouriteSchema = new Schema({
    id: {
        type: String,
        default: shortid.generate(),
        hashKey: true
    },
    userId: {
        type: String,
        required: true
    },
    albumId: {
        type: Number,
        required: true
    },
    trackId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

FavouriteSchema.statics.getAll = async function(cb) {
    let results = await this.scan().exec();
    while (results.lastKey) {
        results = await this.scan()
            .startKey(results.startKey)
            .exec();
    }
    return results;
};

module.exports = Favourite = dynamoose.model('favourite', FavouriteSchema, {
    update: process.env.ENVIRONMENT == 'development' ? true : false
});
