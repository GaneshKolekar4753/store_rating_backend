const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoose");
const routes =require( "./src/routes/index.js");
const cors=require("cors");


const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/api",routes);
app.use("/",(req,res)=>{
    res.send("welcome to the new project")
});

app.listen(port, (err) => {
  if (err) {
    console.log("Error, server is not up", err);
  }
  console.log(`server is up on port:${port}`);
  //connect mongodb
  connectDB();
});
