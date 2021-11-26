const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, name: user.name }, process.env.jwt_secret);
};

module.exports = generateToken;
