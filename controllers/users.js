// const { dbVersion } = require("../dbConnection");
const User = require("../models/User");

const { hashPassword, matchPassword } = require("../utils/password");
const { sign } = require("../utils/jwt");

module.exports.createUser = async (req, res) => {
  try {
    if (!req.body.user.username) throw new Error("Username in required.");
    if (!req.body.user.email) throw new Error("Email in required.");
    if (!req.body.user.password) throw new Error("Password in required.");
    const pword = await hashPassword(req.body.user.password);
    const checkUserExisting = await User.findByPk(req.body.user.email);
    if (checkUserExisting) {
      throw new Error("User created!");
    }
    const user = await User.create({
      username: req.body.user.username,
      password: pword,
      email: req.body.user.email,
    });
    if (user) {
      if (user.dataValues.password) {
        delete user.dataValues.password;
      }
      user.dataValues.token = await sign(user);
      user.dataValues.bio = null;
      user.dataValues.image = null;
      res.status(201).json({ user });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.login = async (req, res) => {
  try {
    if (!req.body.user.email) throw new Error("Email is required.");
    if (!req.body.user.password) throw new Error("Password is required");
    const user = await User.findByPk(req.body.user.email);

    if (!user) {
      res.status(401);
      throw new Error("No User with this email id");
    }

    const checkPassword = await matchPassword(
      user.password,
      req.body.user.password
    );

    if (!checkPassword) {
      throw new Error("Invalid password.");
    }
    delete user.dataValues.password;
    user.dataValues.token = await sign({email: user.dataValues.email,username:user.dataValues.password})
    res.status(200).json({user})

  } catch (err) {
    console.log(err);
  }
};
