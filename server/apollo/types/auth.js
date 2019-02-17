const typeDefs = `
    scalar Date

    type User {
        id: String!
        name: String!
        email: String!
        password: String!
        date: Date!
    }

    type Token {
        success: Boolean!
        token: String!
    }

    extend type Mutation {
        register(name: String!, email: String!, password: String!, password2: String!): User!
        login(email: String!, password: String!): Token!
    }
`;

module.exports = { typeDefs };
