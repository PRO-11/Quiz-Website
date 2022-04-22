const mongoose=require('mongoose')
const marks=mongoose.Schema({
    quiz_id:String,
   marks:Number
})
const user1 = new mongoose.Schema({
    user_id:{
        type:String,
        required:true  
      },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    quiz:[marks]
  });
  const user = mongoose.model('user', user1);
  user.createIndexes();
  module.exports=user;
