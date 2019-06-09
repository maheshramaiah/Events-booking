const { GraphQLObjectType } = require('graphql');
const { signup, signin } = require('./auth');
const createEvent = require('./events');

module.exports = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    signup,
    signin,
    createEvent
  }
});