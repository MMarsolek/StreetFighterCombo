const router = require('express').Router();
const User = require('../../model/Users');

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

router.post('/', async (req, res) => {
    console.log("signup attempt")
    console.log(req.body)
    try {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email, 
        password: req.body.password,
      });

      req.session.user = {
        id:newUser.id,
        email:newUser.email,
        name:newUser.name
      }
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
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
      req.session.user = {
        id:user.id,
        email:user.email,
        name:user.name
      }
      res.json({ user, message: 'You are now logged in!' });
    } catch (err) {
      res.status(400).json({ message: 'Incorrect username or password' });
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.user) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  


module.exports = router;