const router = require('express').Router();
const userRoutes = require('./user-routes');
const comboRoutes = require('./combo-routes');
const moveRoutes = require('./move-routes');
const characterRoutes = require('./character-routes');

router.use('/moves', moveRoutes);
router.use('/combos', comboRoutes);
router.use('/users', userRoutes);
router.use('/character', characterRoutes);


module.exports = router;