const mongoose = require('mongoose');
const url=process.env.mongourl

const connectToMongo=()=>{
   mongoose.connect(url,()=>{
    console.log("Connect to db");
   }) 
}

module.exports=connectToMongo