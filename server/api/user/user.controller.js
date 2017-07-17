const bcrypt = require('bcrypt');
const User = require('../../../models').User;
const signToken = require('../../auth/auth').signToken;

module.exports = {
  saveUser,
  getUser,
};

// Register new user
function saveUser(req, res) {
  const name = req.body.name;

  if (!name) {
    return res
      .status(422)
      .send({ error: 'A name is required.' });
  }

  // Check if email already exists
  User.findAll({
    where: { name },
  })
    .then((user) => {
      if (user.length > 0) {
        return res
        .status(400)
        .send({ error: 'The name is already saved.' });
      }

      const newUser = {
        name
      };

      User.create(newUser)
        .then((data) => {
          return res.json({
            token: signToken(data.id),
            user: {
              id: data.id,
              name
            },
          });
        })
        .catch(err => res.status(400).send({ error: err.message }));
    })
    .catch(err => res.status(400).send({ error: err.message }));
}

// Get one user
function getUser(req, res) {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(400).send({ error: 'No user found' });
      }
      return res.json({
        id: user.id,
        name: user.name,
      });
    })
    .catch(err => res.status(400).send({ error: err.message }));
}
