const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
  name: {type:String, required:true},
  type: {type:String, enum:['ngo','restaurant','other'], default:'ngo'},
  description: String,
  contactEmail: String,
  contactPhone: String,
  location: { lat: Number, lng: Number, city: String },
  verified: {type:Boolean, default:false},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Organization', orgSchema);
