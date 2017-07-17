module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });


  // Insert seed users
  if (process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test') {

    const bcrypt = require('bcrypt');
    const users = require('../seeders/users');

    sequelize
    .sync()
    .then(() => {
      User
      .findAndCountAll()
      .then((result) => {
        if (result.count === 0) {
          for (let i = 0; i < users.length; i++) {
            User.create({
              name: users[i].name,
            });
          }
        }
      });
    })
    .catch((e) => {
      console.log('ERROR SYNCING WITH DB: ', e);
    });
  }
  return User;
};
