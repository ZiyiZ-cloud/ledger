
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { UnauthorizedError } = require("../expressError");

 
// middleware: authenticate user
// if token is provided, verify if it is valid and store token to res.locals

function authenticateJWT(req, res, next) {
    try {
      const authHeader = req.headers && req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace(/^[Bb]earer /, "").trim();
        res.locals.user = jwt.verify(token, SECRET_KEY);
      }
      return next();
    } catch (err) {
      return next();
    }
}


/** Middleware to use when they must provide a valid token & be user matching
 *  username provided as route param.
 *
 *  If not, raises Unauthorized.
 */

 function ensureCorrectUser(req, res, next) {
    try {
      const user = res.locals.user;
      if (!(user && (user.username === req.params.username))) {
        throw new UnauthorizedError();
      }
      return next();
    } catch (err) {
        console.log(req.params.username)
      return next(err);
    }
  }
  
  
  module.exports = {
    authenticateJWT,
    ensureCorrectUser,
  };
  