const express = require('express');
const {connection} = require('./config/db');
// const {User} =require('./model/user.model');
const cors = require('cors');
const jwt =require('jsonwebtoken');
const bcrypt =require('bcrypt');
const { authenticate } = require('./middleware/auth');
const { authorise } = require('./middleware/auth');
const userRouter = require('./Route/user');
const dataRouter= require('./Route/data');

require('dotenv').config();

const port =process.env.PORT
const app =express();

app.use(express.json());

app.use(cors());

app.use('/user', userRouter);
app.use('/data', dataRouter);

app.get('/', async(req, res)=>{
    res.send('This is the main page');
})




app.listen(port, async ()=>{
    try {
       await connection;
       console.log('Connected to server'); 
    } catch (error) {
        console.log(error);
    }

    console.log(`listening to server  ${port}`)
})