const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema({
  BookName:{
    type:String, require:true
  },
  BookTitle:{
    type:String, require:true
  },
  Author:{
    type:String, require:true
  },
  SellingPrice:{
    type:String, require:true
  },
  PublishDate:{
    type:String
  },

}, {timestamps:true});

const Book=mongoose.model("books",bookSchema);

module.exports ={Book};