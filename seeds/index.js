const sequelize = require('../config/connection.js');
const { Character, Move } = require('../model');

const characterData = require('./Characters.json');
const moveData = require('./Moves.json');

const seedDataBase = async () => {
    // We want to make sure that we're overwriting the database each time we run the seed function
    await sequelize.sync({ force: true });

    const characters = await Character.bulkCreate(characterData);
    
    const moves = await Move.bulkCreate(moveData);

    process.exit(0);
}

seedDataBase();