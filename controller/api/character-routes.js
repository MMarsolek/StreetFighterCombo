const router = require('express').Router();
const {Character, Combo, Move} = require('../../model');

//Get all characters from database
router.get('/', async (req,res) => {
    try {
        const charData = await Character.findAll();
        const rawCharData = charData.map(character => character.get({ plain:true }));

        res.status(200).json(rawCharData);
    } catch(err) {
        console.log(`=====\n${err}\n=====`);
        res.status(500).send(err);
    }
});

//Get one character from database

router.get('/:charName', async (req,res) => {
    try {
        const charData = await Character.findOne(
            {
                where: {
                    name: req.params.charName
                },
                include: [Move, {model: Combo, order: [['id', 'DESC']]}]
            }
        );
        const rawCharData = charData.get({ plain:true });

        res.status(200).json(rawCharData);
    } catch(err) {
        console.log(`=====\n${err}\n=====`);
        res.status(500).send(err);
    }
})


module.exports = router;