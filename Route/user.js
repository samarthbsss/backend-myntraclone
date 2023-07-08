const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const User= require('../model/user.model');

router.post('/signup', async (req, res) => {
    try {
      const { name, password, email, phone } = req.body;
    const newuser = new User({
      name,
      email,
      password: bcrypt.hashSync(password,8),
      phone,
    });

  
    await newuser.save();

    res.json({msg:'User registered successfully'});
    } catch (error) {
     console.log(error);
      res.json({msg:'Error creating User',error});
    }
  });

router.post('/login', async (req, res)=>{
    const {email , password} = req.body;
    const user = await User.findOne({email});
     if(!user){
         res.send({msg:'User not Found please register'});
     }else{
         const hash= user.password;
         console.log(hash);
         const decyptedpass =bcrypt.compareSync(password, hash);
         if(decyptedpass){
             const token =jwt.sign({userId: user._id}, process.env.secretKey);
             res.send({
                 msg:'Login Successfull',
                 user:email,
                 token:token,
             })
         }else{
             res.send({msg:'password did not match'});
         }
     }
 
 })

  
  module.exports = router;