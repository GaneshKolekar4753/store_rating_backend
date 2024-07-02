const express=require("express");
const StoreController =require("../controller/storeController.js");

const sc=new StoreController();
const router=express.Router();

router.post("/addstore",sc.addStore);
router.get("/",sc.getAllStore);
router.get("/mystore",sc.getMyStore);

module.exports=router;