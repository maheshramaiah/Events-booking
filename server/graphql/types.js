const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
  GraphQLFloat
} = require('graphql');
const ObjectId = require('mongodb').ObjectID;
const { AUTHENTICATION } = require('../db/collections');
const { findOne } = require('../db/dataAccess');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    date: { type: new GraphQLNonNull(GraphQLString) },
    coordinates: { type: new GraphQLNonNull(GraphQLList(GraphQLFloat)) },
    creator: {
      type: UserType,
      async resolve(parent) {
        const user = await findOne(AUTHENTICATION, { _id: new ObjectId(parent.creator) });

        return {
          ...user,
          id: user._id
        };
      }
    },
    participants: { type: new GraphQLList(GraphQLID) }
  })
});

const EventInputType = new GraphQLInputObjectType({
  name: 'EventInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    date: { type: new GraphQLNonNull(GraphQLString) },
    coordinates: { type: new GraphQLNonNull(GraphQLList(GraphQLFloat)) }
  })
});

module.exports = {
  UserType,
  Event: EventType,
  EventInput: EventInputType
};