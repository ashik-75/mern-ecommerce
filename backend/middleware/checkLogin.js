const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const checkLogin = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization?.split(" ")[1];

      const decode = await jwt.verify(token, process.env.jwt_secret);
      req.user = await User.findById(decode.id);

      next();
    } catch (error) {
      res.status(401).json(error.message);
    }
  } else {
    res.json("invalid token");
  }
});

const checkAdmin = asyncHandler((req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(404);
    throw new Error("User must be admin");
  }
});

module.exports = { checkLogin, checkAdmin };
