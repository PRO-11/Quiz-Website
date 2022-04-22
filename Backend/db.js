const mongoose = require('mongoose');
const url='mongodb://localhost:27017/Quiz?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
const connectToMongo=()=>{
   mongoose.connect(url,()=>{
    console.log("Connect to db");
   }) 
}

module.exports=connectToMongo