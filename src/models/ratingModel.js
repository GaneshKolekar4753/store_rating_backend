const mongoose=require("mongoose");

const ratingSchema=new mongoose.Schema({
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },

});

const Rating=mongoose.model("Rating",ratingSchema);

module.exports=Rating;