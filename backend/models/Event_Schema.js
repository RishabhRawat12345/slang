const mongoose = require("mongoose");

const Event_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date, 
    required: true,
  },
  maxParticipants: {
    type: Number,
    required: true,
  },
  currentParticipants: {
    type: Number,
    default: 0, 
  },
}, { timestamps: true }); 

module.exports = mongoose.model("Event", Event_schema);
