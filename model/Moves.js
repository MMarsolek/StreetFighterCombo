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
    // The number of frames of animation before an attack becomes "active"--i.e., the period of the animation when the attack does damage and puts the opponent in hitstun on contact
    // Startup is very important to combos: if you can act but your opponent is in hitsun for x more frames, then, provided you time it right, you can hit them with a move with <= x frames of startup and they won't recover in time to block it. However, they WOULD 
    startup: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        // No move has a startup time of fewer than 1 frames
        min: 1
      }
    },
    // Advantage is how quickly you recover from performing this move relative to your opponent after you hit them with it. For instance, if you recover 5 frames earlier than they do, then the move has 5 frames of advantage; if they recover 5 frames earlier than you do, you have -5 frames of advantage.
    // TODO: should we perhaps instead look for more complete frame data so
    advantage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // TODO: possibly include recovery frames here as well so we can determine what specials you have enough time to cancel into
    // There are four main types of moves in street figher: normals, command normals, special moves, and super moves.
    // Normals are standard attacks--light, medium, or heavy punches or kicks.
    // Command normals are also standard attacks, but are input by pressing a normal attack button and a direction at the same time
    // Specials are special techniques, like fireballs or spin kicks or whatnot. They are generally input by entering a quick series of directions followed by a normal attack button--for instance, Ken's hadouken, his fireball move, is input with a quarter-circle forward (down, down-forward, forward in one smooth movement) followed by a punch button
    // Supers are akin to special moves, albeit much more powerful
    // TODO: how are we gonna consider meter usage here? Can this be done on the frontend? Should I include "EX special" as an option?
    moveType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // MAYBE TODO: add in V-skills and V-triggers (almost certainly not, WAY above MVP, considering how much character-specific data entry they would add on)
        isIn: ['normal', 'command normal', 'special', 'super']
      }
    },
    // TODO: ask Joe about how to handle target combo options
    // Target combo stuff goes here
    // A move is special cancelable if you can skip the recovery frames of its animation (i.e., the portion of the animation where the move no longer does damage, and the character is returning to their default stance--for instance, pulling back their leg after throwing a kick) by inputting a special move. Generally, a character only has a few normal moves that are special cancelable, and these moves are key to their combo structure.
    specialCancelable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    // A move is super cancelable if it can be canceled into a character's super. All special cancelable normal moves are super cancelable, and many special moves are super cancelable.
    superCancelable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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