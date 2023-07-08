const express = require('express');
const router = express.Router();
const data= require('../model/data.model');
const products =require('./products');

router.post('/', (req, res)=>{
    console.log(products);
    const objects = req.body;
    data.insertMany(objects)
    .then(() => {
      res.status(200).json({ message: 'Objects added successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error adding objects', details: error });
    });
    // res.send('workinh');
});

router.get('/', (req, res)=>{
    data.find()
    .then(objects => {
        res.status(200).json(objects);
      })
      .catch(error => {
        res.status(500).json({ error: 'Error fetching objects', details: error });
      });
});

module.exports = router;