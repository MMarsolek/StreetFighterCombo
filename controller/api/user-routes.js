const router = require('express').Router();
const User = require('../../model/Users');
const oAuth = require('../../utils/token');
const auth = require('../../utils/auth');

router.get('/', async (req, res) =>{
    try{
        const newUser = await new User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        res.json(newUser); 
    } catch(err) {
        res.status(500).send(err);
    }
});


//Create new user
router.post('/', async (req, res) => {
    console.log("signup attempt")
    console.log(req.body)
    try {
      const newUser = await User.create({
        username: req.body.name,
        email: req.body.email, 
        password: req.body.password,
      });
      const token = oAuth.getToken({userName: newUser.username, email: newUser.email});
      const userObj = {user: newUser, auth: token};
      res.json(userObj);
    } catch (err) {
      console.log(err0)
      res.status(500).send(err);
    }
  });

// User Login
router.post('/login', async (req, res) => {
  console.log("login attempt")
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }
    const validPassword = user.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    console.log("logged in!")
    const token = oAuth.getToken({userName: user.username, email: user.email});

    res.json({ user, message: 'You are now logged in!', auth:token });
  } catch (err) {
    res.status(400).json({ message: 'Incorrect username or password' });
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
    res.status.json(500).json(err)
}
});

  


module.exports = router;