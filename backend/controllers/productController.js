
const Product = require("../models/productModel");




// create product ---Admin
exports.createProduct = async (req,res,next)=>{
  try {
     const product = await Product.create(req.body);

     res.status(201).json({sucess: true,product})
  } catch (err) {
       res.status(401).json({message: err})
  }
}

  //get all products
exports.getAllProducts = async (req,res,next)=>{
    try {
       const products = await Product.find();
       res.status(200).json({message:"product getting is working fine",products})
    } catch (err) {
        res.status(401).json({message: err})
    }
     
}