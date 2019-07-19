const router = require('express').Router();
const { resetPassword } = require('../service/auth');

router.post('/:token', async (req, res) => {
  try {
    await resetPassword(req);
    res.send(true);
  }
  catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;