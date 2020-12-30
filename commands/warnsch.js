const mongoose = require('mongoose');

// OK, schema done

const warning = new mongoose.Schema({
  userid: String,
  reason: String,
  id: String
});

const warnsch = mongoose.model("Warning", warning);
module.exports = warnsch;