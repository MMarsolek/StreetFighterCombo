const Character = require('./Characters');
const Combo = require('./Combos');
const Move = require('./Moves');
const User = require('./Users');
const ComboMove = require('./ComboMoves')


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

Move.hasMany(ComboMove);
ComboMove.belongsTo(Move, {
    onDelete: 'CASCADE'
});

Combo.hasMany(ComboMove);
ComboMove.belongsTo(Combo, {
    onDelete: 'CASCADE'
})

module.exports = {
    Character,
    Combo,
    Move,
    ComboMove,
    User
}