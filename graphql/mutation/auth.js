const bcrypt = require('bcrypt');
const { User, UserInput } = require('../types');
const { insertOne, findOne } = require('../../db/dataAccess');
const { AUTHENTICATION } = require('../../db/collections');

module.exports = {
  type: User,
  args: {
    userInput: {
      type: UserInput
    }
  },
  async resolve(_, args) {
    try {
      const { email, password } = args.userInput;
      const user = await findOne(AUTHENTICATION, { email });

      if (user) {
        throw new Error('User already exists');
      }

      const hash = await bcrypt.hash(password, 10);
      const doc = await insertOne(AUTHENTICATION, {
        email,
        hash
      });

      return {
        id: doc.insertedId,
        email: email
      };
    }
    catch (err) {
      return err;
    }
  }
};