const router = require('express').Router();
const { Combo, ComboMove, Move }  = require('../../model');
const Translator = require('../../utils/comboTranslator')
const oAuth = require('../../utils/token');
const auth = require('../../utils/auth');
const filter =require('../../utils/filter')

//Get all combo from database
router.get('/', async (req, res) => {
    try{
        const combosData = await Combo.findAll();
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
        const comboData = await Combo.findByPk(req.params.id, {
            // TODO: how to sort the ComboMoves by stepNumber?
            include: {model: ComboMove, include: Move}
        });
        if (!comboData) {
            return res.status(404).json({ message: 'No combo found with that id!'});
        }
        const rawComboData = comboData.get({ plain:true });
        res.status(200).json(rawComboData);
    } catch(err) {
        console.log(`=====\n${err}\n=====`);
        res.status(500).send(err);
    }
});

// TODO: add authentication to this route
router.post('/', auth, async (req, res) => {
    // We should find the following in req.body: 
    // title (mandatory) - the title of the combo
    // notation (mandatory) - the transcription of the combo's steps. We'll use the state variable "comboSubmission" on the front end for this
    // notes (optional) - any notes about what is necessary to execute this combo
    // comboMoves: an array of objects containing the information we need to generate the combomoves that will be associated with this combo. We'll use the state variable "renderedCombo" on the front end for this
    // //  ComboId: the id of the combo this combomove is associated with
    // //  MoveId: the id of the move this combomove is associated with
    // //  stepNumber: this combo's step in the combo
    try {
        const tokenData = JSON.parse(atob(req.body.token.split('.')[1]));
        
        const newCombo = await Combo.create({
            title: req.body.title,
            notation: req.body.notation,
            notes: req.body.notes,
            UserId: tokenData.metadata.id
        });

        for (const comboMove of req.body.comboMoves) {
            await ComboMove.create(
                {
                    ComboId: newCombo.id,
                    MoveId: comboMove.moveId,
                    stepNumber: comboMove.stepNumber
                }
            );
        }

        res.status(200).json(newCombo);
    } catch (err) {
        console.log(`=====\n${err}\n=====`);
        res.status(500).send(err);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Combo.destroy({
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