const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express()

//use middleware form node.js to JSON
app.use(express.json());

app.get('/', (req,res) =>{
    res.send("Port 3000 run successfully!");
});

app.get('/api/products', async (req,res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
});

app.get('/api/product/:id', async (req,res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

app.post('/api/products', async (req,res) => {
    try{
       const product =  await Product.create(req.body);
       res.status(200).json(product);
    }
    catch(error){
        res.status(500).json ({message: error.message});
    }
});

//Update Product API

mongoose.connect("mongodb+srv://hazeqwan01:0iDwyBhJc4gjMFtk@hazeqdb.6hpyx.mongodb.net/Node-API?retryWrites=true&w=majority&appName=HazeqDB")
.then(() =>{
    console.log("Connected to database successfully!");
    app.listen(3000,() => {
        console.log("Node server run on port 3000 successfully!");
    });
})
.catch(() =>{
    console.log("Connection failed!");
});

//test commit