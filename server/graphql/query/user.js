const { UserType } = require('../types');
const { getUser } = require('../../service/auth');

module.exports = {
  type: UserType,
  async resolve(_, args, context) {
    try {
      if (!context.isAuthenticated) {
        return null;
      }

      const user = await getUser(context.user.email);

      return {
        ...user,
        id: user._id
      }
    }
    catch (err) {
      return err;
    }
  }
};