const { GraphQLDate } = require('graphql-iso-date');

// const { resolvers: Auth } = require("./auth");
// const { resolvers: Hotsnapper } = require("./hotsnapper");
// const { resolvers: Favourites } = require("./favourites");
const { resolvers: News } = require('./news');

const globals = {
  Date: GraphQLDate
};

module.exports = [globals, News];
