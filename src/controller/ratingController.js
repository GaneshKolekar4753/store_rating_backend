const Rating = require("../models/ratingModel.js");
const Store = require("../models/storeModel.js");
class RatingController {
  async addRating(req, res) {
    const { store, user, rating } = req.body;
    try {
      let existrating = await Rating.findOne({ store, user });
      //update existing rating
      if (existrating) {
        existrating.rating = rating;
        await existrating.save();
      } else {
        //add new rating
        const newRating = await Rating.create({ store, user, rating });
        if (!newRating) {
          return res
            .status(400)
            .json({ msg: "bad request Rating is not submitted" });
        }
        
        //add rating id in store
        let existstore = await Store.findOne({ _id: store });
        if (existstore) {
          existstore.ratings = [...existstore.ratings, newRating._id];
          await existstore.save();
        }
      }
      res.status(200).json({success:"OK", msg: "Rating is submitted" });
    } catch (err) {
      res.status(500).json({ msg: "Internal Server error", error: err });
    }
  }

  async getAllUniqueUsers(req,res){
    try {

      let result;
      Rating.aggregate([
        {
            $group: {
                _id: "$user"
            }
        },
        {
            $project: {
                _id: 0,
                user: "$_id"
            }
        }
    ])
    .then(results => {
        result=results;
        res.status(200).json(results);
    })
    .catch(err => {
      res.status(400).json({ msg: 'not found',error:err });
    });
        
    } catch (err) {
        res.status(500).json({ msg: 'Internal Server error',error:err });
    }
  }
  async getAllRatings(req,res){
    const userID=req.params.userId;
    try {
        const ratings = await Rating.find().find({user:userID}).populate("user").populate("store")
        if(!ratings){
            return res.status(400).json({msg:"no store found"});
        }
        res.status(200).json(ratings);
    } catch (err) {
        res.status(500).json({ msg: 'Internal Server error',error:err });
    }
  }

  async getAllRatingsbyStore(req,res){
    const storeId=req.params.storeId;
    try {
        const ratings = await Rating.find().find({store:storeId}).populate("user").populate("store")
        if(!ratings){
            return res.status(400).json({msg:"no store found"});
        }
        res.status(200).json(ratings);
    } catch (err) {
        res.status(500).json({ msg: 'Internal Server error',error:err });
    }
  }
}

module.exports = RatingController;
