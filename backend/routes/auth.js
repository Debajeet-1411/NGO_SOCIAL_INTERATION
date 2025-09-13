const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Organization = require('../models/Organization');

// sign up
router.post('/signup', async (req,res)=>{
  try{
    const {name,email,password,role,phone,orgName,city,lat,lng} = req.body;
    if(!name || !email || !password) return res.status(400).json({msg:'Missing fields'});
    let existing = await User.findOne({email});
    if(existing) return res.status(400).json({msg:'User exists'});
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    let org = null;
    if(role === 'ngo' && orgName) {
      org = new Organization({name: orgName, type:'ngo', location:{city,lat,lng}});
      await org.save();
    }

    const user = new User({ name, email, password: hashed, role, phone, location: {lat,lng,city}, organization: org?org._id:null });
    await user.save();

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.json({ token, user: { id:user._id, name:user.name, email:user.email, role:user.role } });
  }catch(err){
    console.error(err);
    res.status(500).json({msg:'Server error'});
  }
});

// login
router.post('/login', async (req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({msg:'Invalid credentials'});
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({msg:'Invalid credentials'});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.json({ token, user: { id:user._id, name:user.name, email:user.email, role:user.role } });
  }catch(err){
    console.error(err);
    res.status(500).json({msg:'Server error'});
  }
});

module.exports = router;
