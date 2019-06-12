const { UserType } = require('../types');
const { getUser } = require('../../service/auth');

module.exports = {
  type: UserType,
  resolve(_, args, context) {
    try {
      if (!context.isAuthenticated) {
        return null;
      }

      return getUser(context.user.id);
    }
    catch (err) {
      return err;
    }
  }
};