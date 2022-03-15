const router = require('express').Router();
const User = require('../../model/Users');
const oAuth = require('../../utils/token');
const auth = require('../../utils/auth');
const { Combo, Character }  = require('../../model');

//Create new user
router.post('/', async (req, res) => {
  try {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email, 
        password: req.body.password,
      });
      console.log('newUser')
      console.log(newUser)
      const token = await oAuth.getToken({userName: newUser.username, email: newUser.email, id : newUser.id})
      const userObj = {user:{userName: newUser.username, email: newUser.email, id : newUser.id}, token};
      res.status(200).json({ userObj, token });
    } catch (err) {
      console.log(err)
      res.status(500).json({message: 'Unable to create account'});
      return err
    }
  });

// User Login
router.post('/login', async (req, res) => {
  try {
    console.log(req.body)
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).send({ message: 'Incorrect username' });
      return;
    }
    const validPassword = user.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).send({ message: 'Incorrect password' });
      return;
    }
    const token = await oAuth.getToken({userName: user.username, email: user.email, id : user.id})
    const userObj = {user:{userName: user.username, email: user.email, id : user.id}, token};

      res.json({ userObj, token });
    } catch (err) {
      console.log(err)
    res.status(500).send({message: 'Cannot login. Please try creating a new account'});
  }
});

//Allows users to delete their account
router.delete('/:id', auth, async (req, res) => {
try {
    await User.destroy({
        where: {
            id: req.params.id
        },
    });
    res.status(200).json();
} catch(err){
    console.log(err);
    res.status.json(500).send({ message: 'Unable to delete account' })
}
});

// User Login
router.get('/profile/:name', auth, async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        username: req.params.name,
      },
      include: [{model: Combo, order: [[Combo, 'id', 'DESC']], include: [Character]}]

    });
    console.log('user')
    console.log(user)
      user = user.dataValues
      res.json({ id : user.id, username: user.username, email: user.email, combos: user.combos });
    } catch (err) {
      console.log(err)
    res.status(500).send({message: 'Cannot get data.'});
  }
});
  


module.exports = router;