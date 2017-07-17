module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });


  // Insert seed accounts
  if (process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test') {

    const bcrypt = require('bcrypt');
    const accounts = require('../seeders/accounts');

    sequelize
    .sync()
    .then(() => {
      Account
      .findAndCountAll()
      .then((result) => {
        if (result.count === 0) {
          for (let i = 0; i < accounts.length; i++) {
            Account.create({
              title: accounts[i].title,
              type: accounts[i].type
            });
          }
        }
      });
    })
    .catch((e) => {
      console.log('ERROR SYNCING WITH DB: ', e);
    });
  }
  return Account;
};
