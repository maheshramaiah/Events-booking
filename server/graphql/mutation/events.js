const { EventType, EventInputType } = require('../types');
const { createEvent } = require('../../service/event');

module.exports = {
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
};