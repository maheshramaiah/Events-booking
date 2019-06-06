const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_KEY;

module.exports = {
  async authenticateUser(req, res, next) {
    const token = req.headers.authorization;

    try {
      if (token) {
        const user = await jwt.verify(token.split(' ')[1], JWT_SECRET);

        if (user) {
          req.user = {
            id,
            email
          };
          req.isAuthenticated = true;
        }
      }
    }
    catch (err) {
      req.isAuthenticated = false;
    }

    next();
  }
};