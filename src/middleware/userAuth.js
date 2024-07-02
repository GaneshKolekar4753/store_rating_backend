const User = require("../models/userModel");


module.exports =async  function (req, res, next) {
    const role = req.role;
    try {
      if(role==="User"){  
      next();
      }
      return res.status(401).json({ msg: "authorization denied  for User role" });
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  };