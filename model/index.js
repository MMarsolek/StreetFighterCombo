const Character = require('./Characters');
const ComboMove = require('./ComboMoves');
const Combo = require('./Combos');
const Move = require('./Moves');
const User = require('./Users');

User.hasMany(Combo);
Combo.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Combo.hasMany(ComboMove);
ComboMove.belongsTo(Combo, {
    foreignKey: 'comboId',
    onDelete: 'CASCADE'
});

Character.hasMany(Move);
Move.belongsTo(Character, {
    foreignKey: 'characterId',
    onDelete: 'CASCADE'
});

Move.hasMany(ComboMove);
ComboMove.belongsTo(Move, {
    foreignKey: 'moveId',
    onDelete: 'CASCADE'
});

module.exports = {
    Character,
    Combo,
    ComboMove,
    Move,
    User
}