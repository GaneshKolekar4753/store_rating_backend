const mongoose=require("mongoose");

// const mongoURI="mongodb://localhost:27017/roxiler_db";

const connectDB=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGOURI}store_db`);
        console.log("mongodb is connect successfully:roxiler_db");
    } catch (error) {
        console.log("Error in connecting db",error);
    }
}

module.exports=connectDB;
