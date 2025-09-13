const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// get profile
router.get('/me', auth, async (req,res)=>{
  res.json(req.user);
});

// update profile
router.put('/me', auth, async (req,res)=>{
  try{
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, {new:true}).select('-password');
    res.json(user);
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
});

module.exports = router;
