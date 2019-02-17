const { ApolloError } = require('apollo-server');
const axios = require('axios');
const resolverUrl = `/api/favourites/`;

const resolvers = {
    Query: {
        favourites: (_, args, ctx) => {
            if (!ctx.auth) {
                throw new AuthenticationError('Must be logged in.');
            }
            return axios
                .get(`${ctx.baseUrl}${resolverUrl}`, {
                    headers: { Authorization: ctx.auth }
                })
                .then(({ data }) => data)
                .catch(err => {
                    throw new ApolloError(err.message, 'FAVOURITES_ERROR', {
                        details: err.response.data ? err.response.data : {}
                    });
                });
        },
        favourite: (_, args, ctx) => {
            if (!ctx.auth) {
                throw new AuthenticationError('Must be logged in.');
            }
            const { id } = args;
            return axios
                .get(`${ctx.baseUrl}${resolverUrl}/${id}`, {
                    headers: { Authorization: ctx.auth }
                })
                .then(({ data }) => data)
                .catch(err => {
                    throw new ApolloError(err.message, 'FAVOURITES_ERROR', {
                        details: err.response.data ? err.response.data : {}
                    });
                });
        }
    },
    Mutation: {
        addFavourite: (_, args, ctx) => {
            if (!ctx.auth) {
                throw new AuthenticationError('Must be logged in.');
            }
            const { album_id, track_id } = args;
            return axios
                .post(`${ctx.baseUrl}${resolverUrl}/${album_id}/${track_id}`, {
                    headers: { Authorization: ctx.auth }
                })
                .then(({ data }) => data)
                .catch(err => {
                    throw new ApolloError(err.message, 'FAVOURITES_ERROR', {
                        details: err.response.data ? err.response.data : {}
                    });
                });
        },
        deleteFavourite: (_, args, ctx) => {
            if (!ctx.auth) {
                throw new AuthenticationError('Must be logged in.');
            }
            const { id } = args;
            return axios
                .delete(`${ctx.baseUrl}${resolverUrl}/${id}`, {
                    headers: { Authorization: ctx.auth }
                })
                .then(({ data }) => data)
                .catch(err => {
                    throw new ApolloError(err.message, 'FAVOURITES_ERROR', {
                        details: err.response.data ? err.response.data : {}
                    });
                });
        }
    }
};

module.exports = { resolvers };
