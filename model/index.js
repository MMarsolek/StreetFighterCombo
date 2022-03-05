const Character = require('./Characters');
const Combo = require('./Combos');
const Move = require('./Moves');
const User = require('./Users');

// We're 
User.hasMany(Combo);
Combo.belongsTo(User, {
    onDelete: 'SET NULL'
});

Character.hasMany(Combo);
Combo.belongsTo(Character, {
    onDelete: 'CASCADE'
});

Character.hasMany(Move);
Move.belongsTo(Character, {
    onDelete: 'CASCADE'
});


module.exports = {
    Character,
    Combo,
    Move,
    User
}