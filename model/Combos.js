const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Combo extends Model{};


Combo.init(
    {
        name: {
            type: DataTypes.STRING,         
            allowNull: false
        }
    },
    {
      sequelize
    }
);

module.exports = Combo;