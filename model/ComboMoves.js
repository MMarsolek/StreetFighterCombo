const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ComboMove extends Model {};

ComboMove.init(
    {
    // The step this move is in the combo 
        stepNumber: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false
    }
);

module.exports = ComboMove;