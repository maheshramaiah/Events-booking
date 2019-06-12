const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
  GraphQLFloat
} = require('graphql');
const { getUser } = require('../service/auth');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const Location = {
  fields: {
    address: { type: new GraphQLNonNull(GraphQLString) },
    lat: { type: new GraphQLNonNull(GraphQLFloat) },
    lng: { type: new GraphQLNonNull(GraphQLFloat) }
  }
};

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    startDate: { type: new GraphQLNonNull(GraphQLString) },
    endDate: { type: new GraphQLNonNull(GraphQLString) },
    location: {
      type: new GraphQLObjectType({
        name: 'Location',
        ...Location
      })
    },
    creator: {
      type: UserType,
      resolve(parent) {
        return getUser(parent.creator);
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
    startDate: { type: new GraphQLNonNull(GraphQLString) },
    endDate: { type: new GraphQLNonNull(GraphQLString) },
    location: {
      type: new GraphQLInputObjectType({
        name: 'LocationInput',
        ...Location
      })
    }
  })
});

module.exports = {
  UserType,
  EventType,
  EventInputType
};