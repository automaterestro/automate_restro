// models/Order.js
const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    table_no:{
        type:Number,
        required:true,
    },
    MenuItems:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'MenuItem'
    },
    vacancy:{
        type:Boolean,
        required:true,
    },
    orders:{
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Order' 
    },
    payment_status:{
        type:Boolean,
    }
  });


module.exports = mongoose.model('Table', tableSchema);
