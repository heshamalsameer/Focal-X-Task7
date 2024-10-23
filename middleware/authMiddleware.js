const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    try {
      token = req.headers.authorization;
      console.log(req.headers.authorization);

      // const decoded = jwt.verify(req.headers.authorization, "123hh214");
      const decoded = jwt.verify(token, "123hh214");

      req.user = await User.findById(decoded.id).select("password");
      console.log(req.user);

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
