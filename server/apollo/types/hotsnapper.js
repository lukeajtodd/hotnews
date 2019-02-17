const typeDefs = `
    type Album {
        id: Int!,
        title: String!
        tracks(id: Int): [Track!]!
        created_at: String!,
        updated_at: String!,
    }

    type AlbumResponse {
        success: Boolean!
        album: Album!
    }

    type Track {
        id: Int!,
        album_id: Int!,
        title: String!,
        length: Int!,
        created_at: String!,
        updated_at: String!
    }

    type TrackResponse {
        success: Boolean!
        track: Track!
    }

    extend type Query {
        albums: [Album!]!
        album(id: Int!): Album!
    }

    extend type Mutation {
        addAlbum(title: String!): AlbumResponse!
        updateAlbum(id: Int!, title: String): AlbumResponse!
        deleteAlbum(id: Int!): BasicResponse!
        addTrack(id: Int!, title: String, length: Int): TrackResponse!,
        updateTrack(id: Int!, track_id: Int!, title: String, length: Int): TrackResponse!
        deleteTrack(id: Int!, track_id: Int!): BasicResponse!
    }
`;

module.exports = { typeDefs };
