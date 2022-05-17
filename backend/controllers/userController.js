

const User = require("../models/userModel");


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

        const token = user.getJWTToken();

        res.status(201).json({
            success:true,
            user,
        })
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}