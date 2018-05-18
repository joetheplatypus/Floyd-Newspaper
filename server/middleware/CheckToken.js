const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

async function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err) {
      return res.status(403).send({ auth: false, message: 'Invalid Token' });
    }
    const user = await User.findOne({_id:decoded.id})
    if(!user) {
      return res.status(403).send({ auth: false, message: 'User does not exist' });
    }
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;