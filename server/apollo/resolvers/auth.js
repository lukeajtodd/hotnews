const { ApolloError } = require('apollo-server');
const axios = require('axios');
const resolverUrl = `/api/auth/`;

const resolvers = {
    Mutation: {
        register: (_, args, ctx) => {
            let { name, email, password, password2 } = args;
            return axios
                .post(`${ctx.baseUrl}${resolverUrl}/register`, {
                    name,
                    email,
                    password,
                    password2
                })
                .then(({ data }) => data)
                .catch(err => {
                    throw new ApolloError(err.message, 'API_ERROR', {
                        fields: err.response.data ? err.response.data : {}
                    });
                });
        },
        login: (_, args, ctx) => {
            let { email, password } = args;
            return axios
                .post(`${ctx.baseUrl}${resolverUrl}/login`, {
                    email,
                    password
                })
                .then(({ data }) => data)
                .catch(err => {
                    throw new ApolloError(err.message, 'API_ERROR', {
                        fields: err.response.data ? err.response.data : {}
                    });
                });
        }
    }
};

module.exports = { resolvers };
