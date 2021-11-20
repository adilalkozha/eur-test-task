const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

module.exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

module.exports.matchPassword = async (hash, password) => {
  return await bcrypt.compare(password, hash);
};
