
const { query } = require("express");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");




// create product ---Admin
exports.createProduct = async (req,res,next)=>{
  try {
     req.body.user = req.user.id
     const product = await Product.create(req.body);

     res.status(201).json({sucess: true,product})
  } catch (err) {
       res.status(401).json({message: err})
  }
}

  //get all products

  
exports.getAllProducts = async (req,res,next)=>{
    try {

      const resultPerPage = 5;
      const productCount = await Product.countDocuments();
      const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter().pagination(resultPerPage);
       const products = await apiFeatures.query;
       res.status(200).json({message:"product getting is working fine",products})
    } catch (err) {
        res.status(401).json({message: err})
    }
     
}


//get single product



exports.getProductDetails = async (req,res,next)=>{
  try {
      let product = await Product.findById(req.params.id);
      if(!product){
        return res.status(500).json({
          sucess:false,
          message:"Product not found"
        })
      }
      res.status(200).json({
        success:true,
        product,
        productCount,
      })

  } catch (error) {
    res.status(401).json({message: error.message})
  }
}

//update product admin 

exports.updateProduct = async (req,res,next) =>{
 
    
 
  try {
    let product = await Product.findById(req.params.id);

    if(!product){
      return res.status(500).json({
        sucess:false,
        message:"Product not found"
      })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true,useFindAndModify:false })

    res.status(200).json({
      success:true,
      product
    })
    
  } catch (err) {
    res.status(401).json({message: err})
  }
  
}

 //delete product --admin
exports.deleteProduct = async (req,res,next)=>{
  try {
      let product = await Product.findById(req.params.id);
      if(!product){
        return res.status(500).json({
          sucess:false,
          message:"Product not found"
        })
      }

      await product.remove();
      res.status(200).json({
        success:true,
        message:"product successfully deleted"
      })

  } catch (error) {
    res.status(401).json({message: err})
  }
}




