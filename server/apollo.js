require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-express');
const schema = require('./apollo/schema');

const app = require('./index');
const port = process.env.PORT || 5000;

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    baseUrl: `http://localhost:${port}`
    // auth: req.headers.authorization || false
  }),
  formatError(err) {
    return {
      message: err.message,
      details: err.originalError && err.originalError.details,
      fields: err.originalError && err.originalError.fields,
      code: err.originalError && err.originalError.extensions.code,
      locations: err.locations,
      path: err.path
    };
  }
});

server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Running at localhost:${port}. GraphQl: ${server.graphqlPath}`);
});
