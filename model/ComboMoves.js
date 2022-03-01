const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class ComboMove extends Model{};

ComboMove.init(
  {
    place: {
      type: DataTypes.INTEGER,         
      allowNull: false,
      validate: {
        min: 1
      }
    }
  },
  {
    sequelize
  }
);

module.exports = ComboMove;