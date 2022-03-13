//Middleware that checks for authorization before going to next page. If the user is not
// authorized, it will redirect them to the login page.

const token = require('./token')

const withAuth = (req, res, next) => {
  try {
    console.log(req.body.token)
    token.decryptToken(req.body.token);
    next();
  } catch (error) {
    res.redirect("/login");    
  }
};
  
  module.exports = withAuth;
  