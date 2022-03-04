const router = require('express').Router();
const Character = require('../../model/Character');

//Get all characters from database
router.get('/', async (req,res) => {
    try{
        const charData = await Character.findAll();
        const rawCharData = charData.get({ plain:true });

        res.status(200).json(rawCharData);
    }catch(err) {
        res.status(500).send(err);
    }
});

//Get one character from database

router.get('/:charName', async (req,res) => {
    try{
        const charData = await Character.findOne({
            where: {
                name: req.params.charName
            }
        });
        const rawCharData = charData.get({ plain:true });

        res.status(200).json(rawCharData);
    }catch(err) {
        res.status(500).send(err);
    }
})


module.exports = router;