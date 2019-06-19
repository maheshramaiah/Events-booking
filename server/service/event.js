const ObjectId = require('mongodb').ObjectID;
const { EVENT } = require('../db/collections');
const { insertOne, find, findOne, updateOne } = require('../db/dataAccess');
const { getTimeFromTimezoneOffset } = require('../utils');

const ERROR = 0.0001;

async function isEventOverlapping({ startDate, endDate, location: { lat, lng } }) {
  try {
    const event = await findOne(EVENT,
      {
        $or: [
          {
            'startDate': { $lte: startDate },
            'endDate': { $gte: startDate }
          },
          {
            'startDate': { $lte: endDate },
            'endDate': { $gte: endDate }
          }
        ],
        'location.lat': { $gt: lat - ERROR, $lt: lat + ERROR },
        'location.lng': { $gt: lng - ERROR, $lt: lng + ERROR }
      }
    );

    if (event) {
      throw new Error('Event with same slot already exists');
    }
  }
  catch (err) {
    throw err;
  }
}

async function createEvent(event, userId) {
  try {
    event.creator = userId;
    event.participants = [];

    await isEventOverlapping(event);

    const res = await insertOne(EVENT, event);

    return {
      id: res.insertedId,
      ...event
    }
  }
  catch (err) {
    throw err;
  }
}

function getCategoryOptions(category, time, user) {
  let options = {};

  switch (category) {
    case 0: { //My
      options = { creator: user.id };
      break;
    }
    case 1: { // Upcoming
      options = { startDate: { $gt: time } };
      break;
    }
    case 2: { //Ongoing
      options = { startDate: { $lt: time }, endDate: { $gt: time } };
      break;
    }
    case 3: { //Past
      options = { startDate: { $lt: time } };
      break;
    }
  }

  return options;
}

async function getEvents({ category, timezoneOffset, search }, user) {
  try {
    const time = getTimeFromTimezoneOffset(timezoneOffset).getTime().toString();

    console.log(`Current Time: ${time}`);

    let options = getCategoryOptions(category, time, user);

    if (search) {
      options = { ...options, name: { $regex: `.*${search.toLowerCase()}.*`, $options: 'i' } }
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
    throw err;
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
    throw err;
  }
}

async function addParticipant({ id, userId, isAttending, timezoneOffset }) {
  try {
    const time = getTimeFromTimezoneOffset(timezoneOffset).getTime();
    const event = await getEvent(id);
    const isExisting = event.participants.includes(userId);
    let push;

    if (time > +event.startDate) {
      throw new Error('Cannot update! Event is either in progress or past.');
    }

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
    throw err;
  }
}

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  addParticipant
};