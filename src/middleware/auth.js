const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


module.exports =async  function (req, res, next) {
  const token = req.header("Authorization");

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token,process.env.SECRATE_KEY);
    req.user = decoded;
    const user=await User.findById(decoded.id);
    req.role=user.role;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
