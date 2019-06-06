const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { GraphQLString } = require('graphql');
const { UserInput } = require('../types');
const { findOne } = require('../../db/dataAccess');
const { AUTHENTICATION } = require('../../db/collections');

const JWT_SECRET = process.env.JWT_KEY;

module.exports = {
  type: GraphQLString,
  args: {
    userInput: {
      type: UserInput
    }
  },
  async resolve(_, args, context) {
    try {
      console.log(context);
      const { email, password } = args.userInput
      const user = await findOne(AUTHENTICATION, { email });

      if (!user) {
        throw new Error('Authentication failed');
      }

      const matchPassword = await bcrypt.compare(password, user.hash);

      if (!matchPassword) {
        throw new Error('Authentication failed');
      }

      return await jwt.sign({
        email,
        id: user._id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      }, JWT_SECRET);
    }
    catch (err) {
      return err;
    }
  }
};