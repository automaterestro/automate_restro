const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },
  img:{
    type:String,
    required:true,
  },
  price: {
  type:Number,
  required: true
  },
  is_active:{
    type:Boolean,
    required:true,
    default:true,
  },
  timing:{
      type:Number,
      required:true,
  },
  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }]
} , {timestamps:true});

module.exports = mongoose.model('MenuItem', menuItemSchema);