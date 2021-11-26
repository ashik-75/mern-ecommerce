const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/jwtToken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!!password && !!email && !!password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token: generateToken(user),
    });
  } else {
    throw new Error("Field value Required");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        token: generateToken(user),
      });
    } else {
      throw new Error("Invalid Credentials!");
    }
  } else {
    throw new Error("Invalid Credentials!");
  }
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ updatedAt: -1 });
  res.send(users);
});

const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user?.name) {
    res.send(user);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const updateUserByAdmin = async (req, res) => {
  let user = await User.findById(req.params.id);
  if (user?.name) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
  } else {
    res.status(404);
    throw new Error("User not found!");
  }

  user = await user.save();
  res.send(user);
};

const deleteUserByAdmin = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user?.name) {
    res.json({
      message: "User delete",
    });
  } else {
    throw new Error("User not found!");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  getSingleUser,
  updateUserByAdmin,
  deleteUserByAdmin,
};
