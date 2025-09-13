const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');

// send message
router.post('/', auth, async (req,res)=>{
  try{
    const {to, text, request} = req.body;
    const msg = new Message({ from: req.user._id, to, text, request });
    await msg.save();
    res.json(msg);
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
});

// get messages for user
router.get('/', auth, async (req,res)=>{
  try{
    const msgs = await Message.find({ $or: [{from:req.user._id},{to:req.user._id}] }).sort({createdAt:-1}).limit(200);
    res.json(msgs);
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
});

module.exports = router;
