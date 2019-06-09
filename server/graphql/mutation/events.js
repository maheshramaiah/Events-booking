const { Event, EventInput } = require('../types');
const { EVENT } = require('../../db/collections');
const { insertOne } = require('../../db/dataAccess');

module.exports = {
  type: Event,
  args: {
    eventInput: {
      type: EventInput
    }
  },
  async resolve(_, args, context) {
    try {
      if (!context.isAuthenticated) {
        throw new Error('Not authenticated');
      }

      const { name, description, date, coordinates } = args.eventInput;
      const event = {
        name,
        description,
        date,
        coordinates,
        creator: context.user.id,
        participants: []
      };
      const res = await insertOne(EVENT, event);

      return {
        ...event,
        id: res.insertedId
      };
    }
    catch (err) {
      return err;
    }
  }
};