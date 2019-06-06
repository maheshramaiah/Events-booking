const { GraphQLObjectType } = require('graphql');
const auth = require('./auth');
const event = require('./events');

module.exports = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createUser: auth,
    createEvent: event
  }
});