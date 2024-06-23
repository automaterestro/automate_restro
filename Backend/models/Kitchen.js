const mongoose = require('mongoose');
const Chef=require('../models/Chef')
const Order=require('../models/Order')

const KitchenSchema = new mongoose.Schema({
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }],
    chefs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chef'
    }],
    ordersCompleted:[{
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Order' 
    }]
  }, {timestamps:true});


module.exports = mongoose.model('Kitchen', KitchenSchema);
