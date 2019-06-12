const { GraphQLList } = require('graphql');
const { EventType } = require('../types');
const { getEvents } = require('../../service/event');

module.exports = {
  type: new GraphQLList(EventType),
  async resolve() {
    return getEvents();
  }
};