const express=require("express");
const userRouter =require( "./userRoutes.js");
const storeRouter =require( "./storesRoutes.js");
const ratingRouter =require( "./ratingRoutes.js");
const auth=require("../middleware/auth.js");
const router=express.Router();

router.use("/users",userRouter);
router.use("/stores",auth,storeRouter);
router.use("/ratings",auth,ratingRouter);

module.exports=router;