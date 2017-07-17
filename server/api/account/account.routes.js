const Router = require('express').Router();
const controller = require('./account.controller');
const auth = require('../../auth/auth');

Router.route('/')
  .post(controller.saveAccount);

Router.route('/allAccounts')
  .get(controller.getAccounts)

Router.route('/:id')
  .get(controller.getAccount);


module.exports = Router;
