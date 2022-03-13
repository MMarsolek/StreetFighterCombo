const router = require('express').Router();
const User = require('../../model/Users');
const oAuth = require('../../utils/token');
const auth = require('../../utils/auth');

//Create new user
router.post('/', async (req, res) => {
  console.log(req.body)
  try {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email, 
        password: req.body.password,
      });
      const token = await oAuth.getToken({userName: newUser.username, email: newUser.email})
      const userObj = {user:{userName: newUser.username, email: newUser.email}, token};
      res.json(userObj);
    } catch (err) {
      res.status(500).json({message: 'Unable to create account'});
    }
  });

// User Login
router.post('/login', async (req, res) => {
  console.log("=============login attempt==========")
  console.log(req.body.username)
  try {
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
    console.log(user.password)
    if (!validPassword) {
      res.status(400).send({ message: 'Incorrect password' });
      return;
    }
    const token = await oAuth.getToken({userName: user.username, email: user.email})
    const userObj = {user:{userName: user.username, email: user.email}, token};

      res.json({ userObj, token });
    } catch (err) {
      console.log(req.body)
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

  


module.exports = router;