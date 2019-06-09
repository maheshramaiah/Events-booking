const db = require('./index');

async function insertOne(collection, data) {
  try {
    const res = await db.get().collection(collection).insertOne(data);

    return res;
  }
  catch (err) {
    throw err;
  }
}

async function findOne(collection, data) {
  try {
    const res = await db.get().collection(collection).findOne(data);

    return res;
  }
  catch (err) {
    throw err;
  }
}


async function find(collection, data) {
  try {
    const docs = await db.get().collection(collection).find(data);
    const res = await docs.toArray();

    return res;
  }
  catch (err) {
    throw err;
  }
}


module.exports = {
  insertOne,
  findOne,
  find
};