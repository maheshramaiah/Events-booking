const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
  GraphQLFloat
} = require('graphql');

module.exports = {
  User: new GraphQLObjectType({
    name: 'User',
    fields: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      }
    }
  }),
  UserInput: new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    }
  }),
  Event: new GraphQLObjectType({
    name: 'Event',
    fields: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      description: {
        type: GraphQLString
      },
      date: {
        type: new GraphQLNonNull(GraphQLString)
      },
      coordinates: {
        type: new GraphQLNonNull(GraphQLList(GraphQLFloat))
      },
      creator: {
        type: new GraphQLNonNull(GraphQLID)
      },
      participants: {
        type: new GraphQLList(GraphQLID)
      }
    }
  }),
  EventInput: new GraphQLInputObjectType({
    name: 'EventInput',
    fields: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      description: {
        type: GraphQLString
      },
      date: {
        type: new GraphQLNonNull(GraphQLString)
      },
      coordinates: {
        type: new GraphQLNonNull(GraphQLList(GraphQLFloat))
      }
    }
  })
};