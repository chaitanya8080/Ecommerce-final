

const User = require("../models/userModel");
const sendToken = require("../utils/sendToke.js");

const sendEmail = require("../utils/sendEmail.js")
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


//forgot password

exports.forgotPassword = async(req,res,next)=>{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return next(res.status(404).json({message:"user not fount"}))
        }

        //get ResetPassword Token 

        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave : false})


        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

        const message = `your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email
         then please ignore it`;


         try{
             await sendEmail(
                 {
                    email : user.email,
                    subject : `Ecommerce Password Recovery`,
                    message,
                 }
             )
             res.status(200).json({success:true, message :`Email sent to ${user.email} successfully`})

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordToken = undefined;

        await user.save({ validateBeforeSave : false})

        return next(res.status(500).json({message :error.message}))
    }
}