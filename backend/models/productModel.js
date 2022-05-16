const { url } = require("inspector");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "please enter product name"],trim:true },
  description: {
    type: String,
    required: [true, "please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    maxlength: [8, "price can't exceed 8 characters"],
  },
  rating: { type: Number, default: 0 },
  images: [{
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  }],
  category:{type:String, required:[true,"please enter Category"],},
  Stock:{type:Number, required:[true, "please enter required stock"],maxlength:[3,"Stock cannot exceed 3 char"],default:1},
  numOfReviews:{
      type:Number,default:0
  },
  reviews:[{
      name:{
          type:String, required:true,
      },
      rating:{
          type:Number, required:true,
      },
      comment:{type:String, required:true}
  }],
}, {
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model("Product", productSchema);