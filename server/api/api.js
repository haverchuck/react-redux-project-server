const router = require('express').Router();

// api router will mount other routers for all our resources
router.use('/users', require('./user/user.routes'));
router.use('/accounts', require('./account/account.routes'));

module.exports = router;