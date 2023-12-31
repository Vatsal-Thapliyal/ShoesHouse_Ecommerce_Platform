const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title:{type: String, required:true, unique:true},
        desc:{type: String, required:true},
        img: {type: String, required:true},
        category: {type : String, required: true},
        size:{type: Array, required: true},
        price:{type: Number, required: true}
    },
    { timestamps : true }
);

module.exports = mongoose.model("Product", productSchema);