const { GraphQLNonNull, GraphQLList, GraphQLID, GraphQLString, GraphQLInt } = require('graphql');
const { EventType, CategoryEnumType } = require('../types');
const { getEvents, getEvent } = require('../../service/event');

module.exports = {
  events: {
    type: new GraphQLList(EventType),
    args: {
      category: {
        type: CategoryEnumType
      },
      timezoneOffset: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      search: {
        type: GraphQLString
      }
    },
    resolve(_, args, context) {
      if (args.category === 0 && !context.isAuthenticated) {
        throw new Error('Not authenticated');
      }

      return getEvents(args, context.user);
    }
  },
  event: {
    type: EventType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve(_, args) {
      return getEvent(args.id);
    }
  }
};