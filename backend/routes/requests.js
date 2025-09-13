const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Request = require('../models/Request');
const Organization = require('../models/Organization');
const User = require('../models/User');

// create request (NGO only)
router.post('/', auth, async (req,res)=>{
  try{
    if(req.user.role !== 'ngo' && !req.user.organization) {
      return res.status(403).json({msg:'Only NGOs can post requests'});
    }
    const {title,description,category,urgency,lat,lng,city} = req.body;
    const org = req.user.organization ? await Organization.findById(req.user.organization) : null;
    const reqDoc = new Request({
      title,description,category,urgency,org: org?org._id:null,
      orgName: org?org.name:req.user.name,
      location: {lat,lng,city}
    });
    await reqDoc.save();

    // Simulate notification: in production push to subscribers
    res.json(reqDoc);
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
});

// list requests, optionally by city or nearest
router.get('/', async (req,res)=>{
  try{
    const {city,category} = req.query;
    let filter = { status: 'open' };
    if(city) filter['location.city'] = city;
    if(category) filter['category'] = category;
    const items = await Request.find(filter).sort({createdAt:-1}).limit(200);
    res.json(items);
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
});

// details
router.get('/:id', async (req,res)=>{
  try{
    const item = await Request.findById(req.params.id);
    if(!item) return res.status(404).json({msg:'Not found'});
    res.json(item);
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
});

module.exports = router;
