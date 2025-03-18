const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "123"); // Use process.env.JWT_SECRET
    req.user = decoded; // Attach decoded user data to request
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token", err });
  }
};

module.exports = verifyToken;
