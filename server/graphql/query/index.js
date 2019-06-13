const { GraphQLObjectType } = require('graphql');
const user = require('./user');
const { events, event } = require('./events');

module.exports = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user,
    events,
    event
  }
});