const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name: { type: String, required: true, minlength:4, maxlength: 60 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8, maxlength: 16 },
    address: { type: String, maxlength: 400 },
    role: { type: String, enum: ['Admin', 'User', 'Owner'], default: 'User' },

});

const User=mongoose.model("User",userSchema);

module.exports=User;