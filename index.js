const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const blogRoutes = require('./routes/blog');

//create an express
const app = express();

app.use(express.json())

const PORT = process.env.PORT || 5500;

//connect app to mongodb
const connectionString = process.env.DATABASE_URL || '';
mongoose.connect(connectionString);

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database connected');
});

app.get('/',(req, res)=>{
    console.log('new request');
    res.status(200).json({status:true});
});

app.use('/blog', blogRoutes);

app.listen(PORT, () => {
    console.log(`server is listening on port http://localhost:${PORT}`)
});
