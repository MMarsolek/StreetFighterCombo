const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Character extends Model {};

Character.init(
  {
    // The character's name. Note that no two characters share names, so it must be unique
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 10]
      }
    },
    // The character's nickname
    moniker: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // A brief bio and description of the character's gameplay style
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    // A string containing the file path to the portrait image for this character
    portrait: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false
  }
);

module.exports = Character;