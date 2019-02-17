// const { typeDefs: Auth } = require('./auth');
// const { typeDefs: Hotsnapper } = require('./hotsnapper');
// const { typeDefs: Favourites } = require('./favourites');
const { typeDefs: News } = require('./news');

const globals = `
    type BasicResponse {
        success: Boolean!
    }
    type Query {
        greetings: String!
    }
    type Mutation {
        placeholder: String!
    }
`;

module.exports = [globals, News];
