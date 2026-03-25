const jwt = require("jsonwebtoken");

const jwt_secret = "my_super_secret_key_021502";

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied! No token provided." });
  }

  jwt.verify(token, jwt_secret, (err, decode) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token!" });
    }

    // Attach decoded user info to request object
    req.user = decode;
    next();
  });
};

module.exports = {
  authenticateToken,
};
