const jwt = require('jsonwebtoken');

/*
 * NOTES:
 * > `requireAuth` performs two checks
 *   1) It makes sure `req.user` is defined (i.e. user is logged in)
 *   2) If the user tries to access a `/:username` parameter route,
 *      it makes sure that req.user.username matches the `username`
 *      parameter (i.e. users can access only their own entities).
 */

const checkAuth = (req, res, next) => {
  const token = req.cookies.nToken;
  jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
    if (err) {
      // This if-block leaves `req.user` undefined on all routes
      return next();
    }
    req.user = decodedToken;
    return next();
  });
};

const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ message: 'Unauthenticated.' });
  }
  if (req.params.username && req.params.username !== req.user.username) {
    return res.status(403).send({ message: 'Unauthorized.' });
  }
  return next();
};

const requireUnauth = (req, res, next) => {
  if (req.user) {
    return res
      .status(403)
      .send({ message: `Already logged in as '${req.user.username}'.` });
  }
  return next();
};

module.exports = {
  checkAuth, requireAuth, requireUnauth
};
