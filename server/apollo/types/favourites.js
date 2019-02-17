const typeDefs = `
    type Favourite {
        id: String!
        albumId: Int!
        trackId: Int!
        userId: String!
        date: Date
    }

    extend type Query {
        favourites: [Favourite]
        favourite(id: String!): Favourite
    }

    extend type Mutation {
        addFavourite(album_id: Int!, track_id: Int!): Favourite!
        deleteFavourite(id: String!): BasicResponse!
    }
`;

module.exports = { typeDefs };
