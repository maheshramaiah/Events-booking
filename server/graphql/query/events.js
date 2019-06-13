const { GraphQLNonNull, GraphQLList, GraphQLID } = require('graphql');
const { EventType } = require('../types');
const { getEvents, getEvent } = require('../../service/event');

module.exports = {
  events: {
    type: new GraphQLList(EventType),
    async resolve() {
      return getEvents();
    }
  },
  event: {
    type: EventType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    async resolve(_, args) {
      return getEvent(args.id);
    }
  }
};