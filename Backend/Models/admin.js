const mongoose=require('mongoose')
const {Schema}=mongoose
  const admin1 = new Schema({
    user_id:{
      type:String,
      unique:true,
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
  });
  const Admin = mongoose.model('admin', admin1);
  Admin.createIndexes();
  module.exports=Admin;
