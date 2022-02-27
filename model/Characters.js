const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Character extends Model{};

Character.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          description: {
            type: DataTypes.STRING
          },
          portrait: {
            type: DataTypes.STRING
        }
    },
    {
      sequelize
    }
);

module.exports = Character;