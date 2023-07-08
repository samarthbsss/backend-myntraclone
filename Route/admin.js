const express = require('express');
const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
    name: String,
    price: Number
  });
  
  // Define an Order model
  const Order = mongoose.model('Order', {
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  });
  
  // Create a route to add a new product
  app.post('/admin/products', (req, res) => {
    const { name, price } = req.body;
  
    const product = new Product({ name, price });
  
    product.save()
      .then(() => {
        res.status(201).json(product);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to save product' });
      });
  });
  
  // Create a route to place an order
  app.post('/orders', (req, res) => {
    const { products } = req.body;
  
    const order = new Order({ products });
  
    order.save()
      .then(() => {
        res.status(201).json(order);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to place order' });
      });
  });