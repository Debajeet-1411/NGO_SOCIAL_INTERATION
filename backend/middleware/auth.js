const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if(!token) return res.status(401).json({msg:'No token'});
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if(!user) return res.status(401).json({msg:'Invalid token'});
    req.user = user;
    next();
  } catch(err) {
    console.error(err);
    res.status(401).json({msg:'Token invalid'});
  }
}
