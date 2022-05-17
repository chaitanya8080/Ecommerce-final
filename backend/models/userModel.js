const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, "please enter your name"],
        maxlength: [30, "Name cant exceeed 30 char"], minlength: [4, "name should have more then 4 char"]
    },
    email: {
        type: String, required: [true, "enter the email"], unique: true, validate: [validator.isEmail, "please valid email"]
    },
    password: { type: String, required: [true, "enter the password"], minlength: [8, "password should be greater then 8 char"], select: false },
    avatar: {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
    },
    role: { type: String, default: "user" },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

//jwt token

userSchema.methods.getJWTToken = function(){
     return jwt.sign({id:this._id},process.env.JWT_SECRET,{
         expiresIn:process.env.JWT_EXPIRE,
     })
}


module.exports = mongoose.model("User",userSchema)