const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");


class User extends Model{};

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowsNull: false,
      unique: true
    },
    //Min length of password is set to 8, max t0 32
    //TODO: set up some sort of regex validator to ensure it has the correct amount of symbols and whatnot--ya know, just to really flex on 'em
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 32]
      }
    }
  },
  {
    hooks: {
    // set up beforeCreate lifecycle "hook" functionality
      beforeCreate: newUserData => {
        //Encrypts the password--eight levels of salt should suffice, considering that we aren't actually connecting any sensitive information with a user account (yet)
          newUserData.password = bcrypt.hashSync(newUserData.password, 8);
          return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      beforeUpdate: updatedUserData => {
        updatedUserData.password = bcrypt.hashSync(updatedUserData.password, 8);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
  }
)

module.exports = User;