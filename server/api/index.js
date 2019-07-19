const router = require('express').Router();
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');

router.use('/forgotPassword', forgotPassword);
router.use('/resetPassword', resetPassword);

module.exports = router;