const mongoose = require("mongoose");

const AdditionalDetailSchema = new mongoose.Schema({
  img: {
    type: String,
  },
  about: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model("AdditionalDetail", AdditionalDetailSchema);
