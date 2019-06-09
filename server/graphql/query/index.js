const { GraphQLObjectType } = require('graphql');
const user = require('./user');
const events = require('./events');

module.exports = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user,
    events
  }
});