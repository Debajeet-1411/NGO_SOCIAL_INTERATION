const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type:String, required:true},
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  role: {type:String, enum:['ngo','donor','restaurant','volunteer','admin'], default:'donor'},
  phone: String,
  location: {
    // Simple lat/lng fields
    lat: Number,
    lng: Number,
    city: String
  },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
