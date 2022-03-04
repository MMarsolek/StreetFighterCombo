const router = require('express').Router();
const Combos = require('../../model/Moves');
const Translator = require('../../utils/comboTranslator')

//Get all combo from database
router.get('/', async (req,res) => {
    try{
        const comboData = await Combos.findAll();
        const rawCombosData = comboData.get({ plain:true });

        res.status(200).json(rawCombosData);
    }catch(err) {
        res.status(500).send(err);
    }
});

//Get one combo from database
router.get('/:id', async (req,res) => {
    try{
        const comboData = await Combos.findOne({
            where: {
                _id: req.params.id
            }
        });
        const rawCombosData = comboData.get({ plain:true });

        res.status(200).json(rawCombosData);
    }catch(err) {
        res.status(500).send(err);
    }
})


//Translate new combo
router.get('/:comboToTranslate', async (req,res) => {
    try{
        const translated = Translator(req.params.comboToTranslate)
        res.status(200).json(translated);
    }catch(err) {
        res.status(500).send(err);
    }
})


module.exports = router;



module.exports = router;