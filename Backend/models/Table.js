const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  table_no: {
   type: Number,
   required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  occupied: {
   type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model('Table', tableSchema);
