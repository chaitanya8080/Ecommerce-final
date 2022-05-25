


const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

exports.isAuthenticatedUser = async (req, res,next)=>{

    try {
        const {token} = req.cookies;
        console.log(token)
   
    if(!token){
        return next(res.status(401).json({messege:"please login to access this resource"}))
    }


  const decodedData = jwt.verify(token, process.env.JWT_SECRET)


  req.user = await User.findById(decodedData.id);

    } catch (error) {
        res.status(401).json({messege:"please login to access this resource"})
    }
   next();
}

exports.authorizeRole = (...roles)=>{
   
        return (req,res,next)=>{
        
            if(!roles.includes(req.user.role)){
                return next(( res.status(403).json({messege:`${req.user.role} is not allowed to access`})))
            }

            next();
    }
}

