const ObjectId = require('mongodb').ObjectID;
const { EVENT } = require('../db/collections');
const { insertOne, find, findOne, updateOne } = require('../db/dataAccess');

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

async function getEvents({ category = 'all', time }, user) {
  try {
    let options = {};

    switch (category) {
      case 0: {
        options = { creator: user.id };
        break;
      }
      case 1: {
        options = { startDate: { $gt: time } };
        break;
      }
      case 2: {
        options = { startDate: { $lt: time }, endDate: { $gt: time } };
        break;
      }
      case 3: {
        options = { startDate: { $lt: time } };
        break;
      }
    }

    const events = await find(EVENT, options);

    return events
      .map(event => ({
        ...event,
        id: event._id
      }))
      .sort((a, b) => +a.startDate - +b.startDate);
  }
  catch (err) {
    return err;
  }
}

async function getEvent(id) {
  try {
    const event = await findOne(EVENT, { _id: new ObjectId(id) });

    return {
      ...event,
      id: event._id
    };
  }
  catch (err) {
    return err;
  }
}

async function addParticipant({ id, userId, isAttending }) {
  try {
    const event = await getEvent(id);
    const isExisting = event.participants.includes(userId);
    let push;

    if (isAttending) {
      if (isExisting) {
        throw new Error('User is already participating!');
      }
      push = true;
    }
    else {
      if (!isExisting) {
        throw new Error('User is not participating!')
      }
      push = false;
    }

    await updateOne(
      EVENT,
      { _id: new ObjectId(id) },
      {
        [push ? '$push' : '$pull']: {
          participants: userId
        }
      }
    );

    return true;
  }
  catch (err) {
    return err;
  }
}

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  addParticipant
};