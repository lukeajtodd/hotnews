const { ApolloError, AuthenticationError } = require('apollo-server');
const axios = require('axios');
const resolverUrl = process.env.HOTSNAPPER_IP;

const headers = {
    'api-username': process.env.HOTSNAPPER_USER,
    'api-token': process.env.HOTSNAPPER_PWD
};

const resolvers = {
    Query: {
        albums: (_, args, ctx) => {
            if (!ctx.auth) {
                throw new AuthenticationError('Must be logged in.');
            }
            return axios
                .get(`${resolverUrl}/albums`, {
                    headers
                })
                .then(res => {
                    let data = res.data.albums;
                    return data;
                })
                .catch(err => {
                    throw new ApolloError(err.message, 'HOTSNAPPER_ERROR', {
                        details: err.response.data ? err.response.data : {}
                    });
                });
        }
    },
    Album: {
        tracks: (parent, args) => {
            if (args.id) {
                return parent.tracks.filter(track => track.id == args.id);
            } else {
                return parent.tracks;
            }
        }
    },
    Mutation: {
        addAlbum: (_, args, ctx) => {
            if (!ctx.auth) {
                throw new AuthenticationError('Must be logged in.');
            }
            const { title } = args;
            return axios
                .post(
                    `${resolverUrl}/albums`,
                    {
                        title
                    },
                    { headers }
                )
                .then(({ data }) => data)
                .catch(err => {
                    throw new ApolloError(err.message, 'HOTSNAPPER_ERROR', {
                        details: err.response.data ? err.response.data : {}
                    });
                });
        },
        updateAlbum: (_, args, ctx) => {
            if (!ctx.auth) {
                throw new AuthenticationError('Must be logged in.');
            }
            const { id, title } = args;
            return axios
                .put(
                    `${resolverUrl}/albums/${id}`,
                    {
                        title
                    },
                    { headers }
                )
                .then(({ data }) => data)
                .catch(err => {
                    throw new ApolloError(err.message, 'HOTSNAPPER_ERROR', {
                        details: err.response.data ? err.response.data : {}
                    });
                });
        },
        deleteAlbum: (_, args, ctx) => {
            if (!ctx.auth) {
                throw new AuthenticationError('Must be logged in.');
            }
            const { id } = args;
            return axios
                .delete(`${resolverUrl}/albums/${id}`, { headers })
                .then(({ data }) => data)
                .catch(err => {
                    throw new ApolloError(err.message, 'HOTSNAPPER_ERROR', {
                        details: err.response.data ? err.response.data : {}
                    });
                });
        },
        addTrack: (_, args, ctx) => {
            if (!ctx.auth) {
                throw new AuthenticationError('Must be logged in.');
            }
            const { id, title, length } = args;
            return axios
                .post(
                    `${resolverUrl}/albums/${id}/tracks`,
                    { title, length },
                    { headers }
                )
                .then(({ data }) => data)
                .catch(err => {
                    throw new ApolloError(err.message, 'HOTSNAPPER_ERROR', {
                        details: err.response.data ? err.response.data : {}
                    });
                });
        },
        updateTrack: (_, args, ctx) => {
            if (!ctx.auth) {
                throw new AuthenticationError('Must be logged in.');
            }
            const { id, track_id, title, length } = args;
            let options = {};
            title ? (options.title = title) : null;
            length ? (options.length = length) : null;
            return axios
                .put(
                    `${resolverUrl}/albums/${id}/tracks/${track_id}`,
                    options,
                    { headers }
                )
                .then(({ data }) => data)
                .catch(err => {
                    console.log(err);
                    throw new ApolloError(err.message, 'HOTSNAPPER_ERROR', {
                        details: err.response.data ? err.response.data : {}
                    });
                });
        },
        deleteTrack: (_, args, ctx) => {
            if (!ctx.auth) {
                throw new AuthenticationError('Must be logged in.');
            }
            const { id, track_id } = args;
            return axios
                .delete(`${resolverUrl}/albums/${id}/tracks/${track_id}`, {
                    headers
                })
                .then(({ data }) => data)
                .catch(err => {
                    throw new ApolloError(err.message, 'HOTSNAPPER_ERROR', {
                        details: err.response.data ? err.response.data : {}
                    });
                });
        }
    }
};

module.exports = { resolvers };
