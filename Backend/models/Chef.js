const mongoose = require('mongoose');
const User=require('../models/User');

const ChefSchema = new mongoose.Schema({
    chef:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    experience:{
        type:String,
        required:true
    },
    cuisine:{
        type:String,
        enum:['Rajasthani','Maharastrian','Indian','Chinese']
    },
    is_Active:{
        type:Boolean
    },
    orders:{
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Order' 
    }
  });


module.exports = mongoose.model('Chef', ChefSchema);
