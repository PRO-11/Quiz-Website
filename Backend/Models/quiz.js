const mongoose=require('mongoose');
const quizes=mongoose.Schema({
    Ques:String,
    Option1:String,
    Option2:String,
    Option3:String,
    Option4:String,
    Correct:Number,
    Marks:Number
})
const quiz1 = new mongoose.Schema({
    admin:{
        type:String,
        required:true
          },   
       quiz:[quizes],
      class:{
          type:String,
          required:true
      },
      start:{
          type:Date,
          required:true,
          default:Date.now
      },
      end:{
        type:String,
        required:true,
      },
      sub_name:{
          type:String,
          required:true
      },
      quizname:{
        type:String,
        required:true
    },
    totalmarks:{
        type:Number,
        required:true
    }
  });
  const quiz = mongoose.model('quiz', quiz1);
  module.exports=quiz;