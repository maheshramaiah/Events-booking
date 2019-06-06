const { GraphQLObjectType } = require('graphql');
const auth = require('./auth');
const events = require('./events');

module.exports = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    auth,
    events
  }
});