const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Combo extends Model{};


Combo.init(
  {
    // a title for the combo
    title: {
      type: DataTypes.STRING,  
      allowNull: false  
    },
    // The notation for the whole combo
    notation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //A description of any particularities of the combo that bear noting. Optional.
    notes: {
      type: DataTypes.STRING(1000)
    }
    //Many ComboMoves are associated with each combo--this is handled in index.js
  },
  {
    sequelize
  }
);

module.exports = Combo;