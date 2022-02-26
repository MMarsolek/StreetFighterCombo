//Middleware that checks for authorization before going to next page. If the user is not
// authorized, it will redirect them to the login page.

const withAuth = (req, res, next) => {
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  