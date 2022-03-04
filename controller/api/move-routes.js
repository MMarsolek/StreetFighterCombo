const router = require('express').Router();
const Moves = require('../../model/Moves');

//Get all moves from database
router.get('/', async (req,res) => {
    try{
        const moveData = await Moves.findAll();
        const rawMoveData = moveData.get({ plain:true });

        res.status(200).json(rawMoveData);
    }catch(err) {
        res.status(500).send(err);
    }
});

//Get one move from database

router.get('/:id', async (req,res) => {
    try{
        const moveData = await Moves.findOne({
            where: {
                _id: req.params.id
            }
        });
        const rawMoveData = moveData.get({ plain:true });

        res.status(200).json(rawMoveData);
    }catch(err) {
        res.status(500).send(err);
    }
})


module.exports = router;

