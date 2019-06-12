const { EVENT } = require('../db/collections');
const { insertOne, find } = require('../db/dataAccess');

async function createEvent(event, userId) {
  try {
    event.creator = userId;
    event.participants = [];

    const res = await insertOne(EVENT, event);

    return {
      id: res.insertedId,
      ...event
    }
  }
  catch (err) {
    return err;
  }
}

async function getEvents() {
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

module.exports = {
  createEvent,
  getEvents
};