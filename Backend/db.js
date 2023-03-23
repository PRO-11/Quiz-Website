const mongoose = require('mongoose');
const url=process.env.mongourl

const connectToMongo=()=>{
   mongoose.connect("mongodb+srv://PRATHAM:PRATHAM111@pro-quiz.1tl3a.mongodb.net/test",()=>{
    console.log("Connect to db");
   }) 
}

module.exports=connectToMongo