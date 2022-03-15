//Middleware that checks for authorization before going to next page. If the user is not
// authorized, it will redirect them to the login page.

const token = require('./token')

const withAuth = async (req, res, next) => {
  console.log('verifing Token')
  try {
    console.log(req.headers.token)
    if(req.headers.token){
      await token.decryptToken(req.headers.token);
      next();
    }
  } catch (error) {
    console.log(req.headers);
    console.log(error);
    // TODO: this isn't working; fix   
    res.status(401).end();
  }
};
  
  module.exports = withAuth;
  