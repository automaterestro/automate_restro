// models/Order.js
const mongoose = require("mongoose");
const User=require('../models/User');
const Table=require('../models/Table')
const MenuItem=require('../models/MenuItem');

const userInfoSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  table_no: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
  },
  payments_status: {
    type:String,
    default:false,
  },
  orders:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  }],
},  {timestamps:true});

module.exports = mongoose.model("UserInfo", userInfoSchema);
