const jwt = require("jsonwebtoken");
const createToken = (email, role) => {
  return jwt.sign({ email, role}, "123", { expiresIn: "20d" });
};

module.exports = createToken;
