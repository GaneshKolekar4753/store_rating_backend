const express=require("express");
const  RatingController=require ("../controller/ratingController.js");

const rc=new RatingController();
const router=express.Router();

router.post("/submit",rc.addRating);
router.get("/all",rc.getAllUniqueUsers);
router.get("/:userId",rc.getAllRatings);
router.get("/store/:storeId",rc.getAllRatingsbyStore);

module.exports=router;