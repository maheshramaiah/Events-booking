const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { insertOne, findOne } = require('../db/dataAccess');
const { AUTHENTICATION } = require('../db/collections');
const JWT_SECRET = process.env.JWT_KEY;

async function getToken(id, name, email) {
  return await jwt.sign({
    id,
    name,
    email,
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }, JWT_SECRET);
}

async function addUser({ name, email, password }) {
  try {
    const isExisting = await findOne(AUTHENTICATION, { email });

    if (isExisting) {
      throw new Error('User already exists');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await insertOne(AUTHENTICATION, { name, email, hash });
    const token = await getToken(user.insertedId, name, email);

    return token;
  }
  catch (err) {
    return err;
  }
}

async function verifyUser({ email, password }) {
  try {
    const user = await findOne(AUTHENTICATION, { email });

    if (!user) {
      throw new Error('Authentication failed');
    }

    const matchPassword = await bcrypt.compare(password, user.hash);

    if (!matchPassword) {
      throw new Error('Authentication failed');
    }

    return await getToken(user._id, user.name, user.email);
  }
  catch (err) {
    return err;
  }
}

async function getUser(email) {
  try {
    return await findOne(AUTHENTICATION, { email });
  }
  catch (err) {
    return err;
  }
}

module.exports = {
  addUser,
  verifyUser,
  getUser
};