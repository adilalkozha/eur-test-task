const jwt = require("jsonwebtoken");
const JWT_SECRET = "super_secret";
module.exports.sign = async (user) => {
  return await jwt.sign({
    username: user.username,
    email: user.email
  }, JWT_SECRET);
};

module.exports.decode = async (token) => {
    return await jwt.verify(token,JWT_SECRET);
}
