const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");


class UserController {
  async createUser(req, res) {
    const { name, email, password, address, role } = req.body;
    try {
      const existuser = await User.findOne({ email });
      if (existuser) {
        return res.status(400).json({ msg: "User already exists" });
      }
    
      const newUser = await User.create({
        name,
        email,
        password: password,
        address,
        role,
      });

      if (newUser) {
        //create JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.SECRATE_KEY, {
          expiresIn: "1d",
        });
        return res.status(200).json({
          success:"OK",
          token,
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
        });
      }
      return res.status(400).json({ msg: "bad request" });
    } catch (err) {
      res.status(500).json({ msg: "Internal Server error", error: err });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
      }

      if (user.password !== password) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRATE_KEY, { expiresIn: "1d" });

      res.status(200).json({
        success:"OK",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      res.status(500).json({ msg: "Internal Server error", error: err });
    }
  }

  async getAllUsers(req,res){
    try {
        const users = await User.find();
        if(!users){
            return res.status(400).json({msg:"no user found"});
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Internal Server error',error:err });
    }
  }


}

module.exports = UserController;
