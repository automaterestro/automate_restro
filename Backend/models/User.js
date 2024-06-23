const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
      type:String,
      required:true,
    },
    email: {
      type:String,
      required:true,
    },
    password: {
      type:String,
      required:true,
    },
    accountType:{
      type:String,
      enum:['Kitchen','User','Waiter','Manager'],
      required:true
    },
    AdditionDetails:{
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Additional Details' 
    }
  },{timestamps:true});


module.exports = mongoose.model('User', UserSchema);
