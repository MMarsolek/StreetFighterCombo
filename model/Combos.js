const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Combo extends Model{};


Combo.init(
  {
    name: {
      type: DataTypes.STRING,         
      allowNull: false
    },
    // OK, so this is going to take a stringified array of objects, like this one:
    // '[{"image":"linkToImage1","name":"moveName1"},{"image":"linkToImage2","name":"moveName2"},{"image":"linkToImage3","name":"moveName3","input":"input3"}]'
    // And it's going to have a getter function that returns that array
    sequence: {
      type: DataTypes.STRING,
      allowNull: false,
      get () {
        return JSON.parse(this.getDataValue('sequence'));
      }
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