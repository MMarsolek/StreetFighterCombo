const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Combo extends Model{};


Combo.init(
  {
    name: {
      type: DataTypes.STRING,         
      allowNull: false
    },
    //A description of any particularities of the combo that bear noting. Optional.
    notes: {
      type: DataTypes.STRING
    }
    //Many ComboMoves are associated with each combo--this is handled in index.js
  },
  {
    sequelize
  }
);

module.exports = Combo;