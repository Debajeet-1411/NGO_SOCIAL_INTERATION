const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  title:{type:String, required:true},
  description: String,
  category: {type:String, enum:['food','funds','clothes','medical','volunteers','other'], default:'other'},
  urgency: {type:String, enum:['low','medium','high'], default:'medium'},
  org: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  orgName: String,
  location: { lat: Number, lng: Number, city: String },
  status: {type:String, enum:['open','accepted','fulfilled','cancelled'], default:'open'},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);
