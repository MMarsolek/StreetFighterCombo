//Middleware that checks for authorization before going to next page. If the user is not
// authorized, it will redirect them to the login page.

const token = require('./token')

const withAuth = (req, res, next) => {
  try {
    token.decryptToken(req.session.user.token)
  } catch (error) {
    res.redirect("/login");    
  }
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
};
  
  module.exports = withAuth;
  