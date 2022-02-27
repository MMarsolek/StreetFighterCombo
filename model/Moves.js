const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Move extends Model{};

//TODO Get clarification on the data types of 'startup', 'cancel_options', and more.
Move.init(
    {
        
    },
    {
      sequelize
    }
);

module.exports = Move;