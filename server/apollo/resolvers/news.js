const { ApolloError, AuthenticationError } = require('apollo-server');
const axios = require('axios');
const keys = require('@config/keys');
const sources = require('@config/sources');
const moment = require('moment');

const buildURL = (sourceKey, sourceURL) => {
  switch (sourceKey) {
    case 'newsapi':
      return `${sourceURL}/top-headlines?country=us&apiKey=${keys[sourceKey]}`;
      break;
    case 'newyorktimes':
      return `${sourceURL}/viewed/1.json`;
      break;
    case 'guardian':
      return `${sourceURL}?api-key=${
        keys[sourceKey]
      }&format=json&from-date=${moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD')}`;
      break;
  }
};

const resolvers = {
  Query: {
    topNews: (_, args, ctx) => {
      return Promise.all(
        Object.keys(sources).map(sourceKey => {
          axios
            .get(buildURL(sourceKey, sources[sourceKey]))
            .then(res => {
              console.log(res);
              return res;
            })
            .catch(err => {
              console.log(err);
            });
        })
      );
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
  }
};

module.exports = { resolvers };
