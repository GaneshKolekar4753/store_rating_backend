const mongoose=require("mongoose");

const storeSchema=new mongoose.Schema({
    name: { type: String, required: true, maxlength: 60 },
    email: { type: String, required: true, unique: true },
    address: { type: String, maxlength: 400 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],

});

const Store=mongoose.model("Store",storeSchema);

module.exports=Store;