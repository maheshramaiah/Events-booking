const { GraphQLNonNull, GraphQLID, GraphQLBoolean, GraphQLInt } = require('graphql');
const { EventType, EventInputType } = require('../types');
const { createEvent, addParticipant } = require('../../service/event');

module.exports = {
  createEvent: {
    type: EventType,
    args: {
      eventInput: {
        type: EventInputType
      }
    },
    resolve(_, args, context) {
      try {
        if (!context.isAuthenticated) {
          throw new Error('Not authenticated');
        }

        return createEvent(args.eventInput, context.user.id);
      }
      catch (err) {
        return err;
      }
    }
  },
  addParticipant: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
      isAttending: { type: GraphQLBoolean },
      timezoneOffset: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(_, args, context) {
      try {
        if (!context.isAuthenticated) {
          throw new Error('Not authenticated');
        }

        return addParticipant(args);
      }
      catch (err) {
        return err;
      }
    }
  }
};