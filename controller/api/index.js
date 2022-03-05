const router = require('express').Router();
const userRoutes = require('./user-routes');
const comboRoutes = require('./combo-routes');
const moveRoutes = require('./move-routes');
const characterRoutes = require('./character-routes');

// TODO: ask what the deal with .get({plain: true})

router.use('/moves', moveRoutes);
router.use('/combos', comboRoutes);
router.use('/users', userRoutes);
router.use('/characters', characterRoutes);


module.exports = router;