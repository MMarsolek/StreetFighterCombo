const router = require('express').Router();
const Combos = require('../../model/Combos');
const Translator = require('../../utils/comboTranslator')
const oAuth = require('../../utils/token');
const auth = require('../../utils/auth');
const filter =require('../../utils/filter')

//Get all combo from database
router.get('/', async (req, res) => {
    try{
        const combosData = await Combos.findAll();
        // TODO: ask what the deal with .get({plain: true}) not working is get({ plain: true });
        const rawCombosData = combosData.map(combo => combo.get({plain: true}));
        res.status(200).json(rawCombosData);
    }catch(err) {
        console.log(`=====\n${err}\n=====`);
        res.status(500).send(err);
    }
});

//Get one combo from database
router.get('/:id', async (req, res) => {
    try {
        const comboData = await Combos.findByPk(req.params.id);
        if (!comboData) {
            return res.status(404).json({ message: 'No combo found with that id!'});
        }
        const rawCombosData = comboData.get({ plain:true });
        res.status(200).json(rawCombosData);
    } catch(err) {
        console.log(`=====\n${err}\n=====`);
        res.status(500).send(err);
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const token = req.session.user.token;
        if (!oAuth.decryptToken(token)){
            res.redirect("/login");
        }
        req.body.notes = filter(req.body.notes);
        const newCombo = await Combos.create(req.body);
        res.status(200).json(newCombo);
    } catch (err) {
        console.log(`=====\n${err}\n=====`);
        res.status(500).send(err);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Combos.destroy({
            where: {
                id: req.params.id
            },
        });
        res.status(200).json();
    } catch(err){
        console.log(err);
        res.status.json(500).json(err)
    }
});



module.exports = router;