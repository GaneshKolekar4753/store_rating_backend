const express=require("express");
const UserController =require("../controller/userController.js");

const uc=new UserController();
const router=express.Router();

router.post("/register",uc.createUser);
router.post("/login",uc.loginUser);
router.get("/all",uc.getAllUsers);

module.exports=router;