const bcrypt = require('bcrypt');

const Account = require('../../../models').Account;
const signToken = require('../../auth/auth').signToken;

module.exports = {
  saveAccount,
  getAccount,
  getAccounts
};

// Register new account
function saveAccount(req, res) {
  const title = req.body.title;
  const type = req.body.type;


  // Check if email already exists
  Account.findAll({
    where: { title },
  })
    .then((account) => {
      if (account.length > 0) {
        return res
        .status(400)
        .send({ error: 'The title is already registered.' });
      }

      const newAccount = {
        title,
        type
      };

      Account.create(newAccount)
        .then((data) => {
          return res.json({
            token: signToken(data.id),
            account: {
              id: data.id,
              title: data.title,
              type: data.type,
            },
          });
        })
        .catch(err => res.status(400).send({ error: err.message }));
    })
    .catch(err => res.status(400).send({ error: err.message }));
}

// Get one account
function getAccount(req, res) {
  Account.findById(req.params.id)
    .then((account) => {
      if (!account) {
        return res.status(400).send({ error: 'No account found' });
      }
      return res.json({
        id: account.id,
        title: account.name,
        type: account.type
      });
    })
    .catch(err => res.status(400).send({ error: err.message }));
}

// Get all accounts
function getAccounts(req, res) {
  Account.findAll()
    .then((accounts) => {
      if (!accounts) {
        return res.status(400).send({ error: 'No accounts found' });
      }
      return res.json({
        accounts
      });
    })
    .catch(err => res.status(400).send({ error: err.message }));
}
