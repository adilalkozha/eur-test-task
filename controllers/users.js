// const { dbVersion } = require("../dbConnection");
const User = require("../models/User");

const { hashPassword } = require("../utils/password");

module.exports.createUser = async (req, res) => {
  try {
    if (!req.body.user.username) throw new Error("Username in required.");
    if (!req.body.user.email) throw new Error("Email in required.");
    if (!req.body.user.password) throw new Error("Password in required.");
    const pword = await hashPassword(req.body.password);
    const user = await User.create({
      username: req.body.user.username,
      password: pword,
      email: req.body.user.email,
    });
    if (user) {
      if (user.dataValues.password) {
        delete user.dataValues.password;
      }
      res.status(201).json({ user });
    }
  } catch (err) {
    console.log(err);
  }
};
