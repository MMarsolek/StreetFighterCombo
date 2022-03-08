const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Move extends Model{};

Move.init(
  {
    // The move's name (there will be a LOT of repeats here, since every single character in the game has a crouching, standing, and jumping light, medium and heavy punch and kick)
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // The move described in traditional street fighter notation (eg: cr. LP, QCF LP, LP DP)
    sfNotation: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    // The move described in more FGC-universal numpad notation (eg: 2LP, 236LP, 623LP)
    numPadNotation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // The input for a move (if it's a special move)
    input: {
      type: DataTypes.STRING
    },
    // An image of the move--as with the portrait in Characters.js, this will include a filepath to the image in our assets folder
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
        //Moves have a character id associated via foreign key--this will be set up in the model directory's index.js file
  },
  {
    sequelize,
    timestamps: false
  }
);

module.exports = Move;