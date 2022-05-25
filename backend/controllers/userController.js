

const User = require("../models/userModel");
const sendToken = require("../utils/sendToke.js");

//Register user

exports.registerUser = async (req,res,next)=>{
    try {
        const {name, email, password} = req.body;

        const user = await User.create({
            name,email,password,
            avatar :{
                public_id :"this is simple id",
                url:"profilepicUrl"
            }
        })

        sendToken(user,201,res)
      
    } catch (error) {
        res.status(201).json({error: error.message})
    }
}


exports.loginUser = async (req,res,next) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return next(res.status(401).json({message:"please enter email,password"}));

        }
        const user = await User.findOne({email}).select("+password")
         
        if(!user){
            return next(res.status(401).json({message:"please enter email,password"}))
        }

        const isPasswordMatched = user.comparePassword(password)

        if(!isPasswordMatched){
            return next(res.status(401).json({message:"please enter email,password"}))
        }

        sendToken(user,200,res);  
    } catch (error) {
       return res.status(401).json({message:"invalid email , password"})
    }

    
}

exports.logoutUser = async (req, res, next)=>{
   try {
       res.cookie("token",null, {
           expires: new Date(Date.now()),
           httpOnly: true,
       })

       res.status(200).json({
           success:true,
           message:"Logged out successfully"
       })
   } catch (error) {
      return res.status(201).json({message:"Please login"})
   }
}