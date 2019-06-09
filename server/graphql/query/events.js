const { GraphQLList } = require('graphql');
const { Event } = require('../types');
const { EVENT } = require('../../db/collections');
const { find } = require('../../db/dataAccess');

module.exports = {
  type: new GraphQLList(Event),
  async resolve() {
    try {
      const events = await find(EVENT, {});

      return events.map(event => ({
        ...event,
        id: event._id
      })); 
    }
    catch (err) {
      return err;
    }
  }
};