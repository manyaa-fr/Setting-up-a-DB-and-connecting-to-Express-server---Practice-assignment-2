require ('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router()
// const {body, validationResult} = require("express-validator")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;

router.post('/users', async (req, res) => {
  try{
    const {name, email, password} = req.body;
    const newUser = new User({name, email, password});
    await newUser.validate();
    await newUser.save();
    res.status(201).json({message: "User created successfully", user: newUser});
  } catch(error){
    res.status(500).json({error: error.message});
  }
  });

  module.exports = router