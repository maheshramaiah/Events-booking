const router = require('express').Router();
const { forgotPassword } = require('../service/auth');

router.post('/', async (req, res) => {
  try {
    await forgotPassword(req);
    res.send(true);
  }
  catch (err) {
    return res.status(500).send({ err });
  }
});

module.exports = router;