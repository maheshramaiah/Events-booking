const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;
const crypto = require('crypto');
const { insertOne, findOne, updateOne } = require('../db/dataAccess');
const { AUTHENTICATION } = require('../db/collections');
const { sendEmail } = require('./email');
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
    throw err;
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
    throw err;
  }
}

async function getUser(id) {
  try {
    const user = await findOne(AUTHENTICATION, { _id: new ObjectId(id) });

    return {
      id: user._id,
      ...user
    };
  }
  catch (err) {
    throw err;
  }
}

async function forgotPassword(req) {
  try {
    const email = req.body.email;
    const user = await findOne(AUTHENTICATION, { email });

    if (!user) {
      throw new Error('No account with this email address exists');
    }

    const buffer = await crypto.randomBytes(20);
    const token = buffer.toString('hex');

    await updateOne(AUTHENTICATION, { email }, {
      $set: {
        resetToken: token,
        resetTokenExpiry: Date.now() + 3600000
      }
    });

    await sendEmail([email], {
      subject: 'Events booking password reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
      Please click on the following link, or paste this into your browser to complete the process:
      http://${req.headers.host}/resetPassword/${token}
      If you did not request this, please ignore this email and your password will remain unchanged.`
    });

    return true;
  }
  catch (err) {
    throw err.message;
  }
}

async function resetPassword(req) {
  try {
    const user = await findOne(AUTHENTICATION, {
      resetToken: req.params.token,
      resetTokenExpiry: {
        $gt: Date.now()
      }
    });

    if (!user) {
      throw new Error('Password reset token is invalid or has expired.');
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    await updateOne(AUTHENTICATION, { email: user.email },
      {
        $set: {
          hash,
          resetToken: null,
          resetTokenExpiry: null
        }
      });

    return true;
  }
  catch (err) {
    throw err.message;
  }
}

module.exports = {
  addUser,
  verifyUser,
  getUser,
  forgotPassword,
  resetPassword
};