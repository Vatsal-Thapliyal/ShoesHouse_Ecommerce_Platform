const router = require("express").Router();
const { verifyToken } = require("./verifyToken");
const Product = require('../models/Product');

//@describe create product
//@describe POST to create
//@access private
router.post("/", verifyToken, async (req,res) => {
    if(req.user.isAdmin){
        const newProduct = new Product(req.body)
        try{
            const savedProduct = await newProduct.save();
            savedProduct.save();
            res.status(200).json(savedProduct)
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You are not an Admin");
    }
});

//@describe update Product
//@describe PUT to update
//@access private
router.put("/:id", verifyToken, async (req,res) => {
    if(req.user.isAdmin){
        try{
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new : true}
            );

            res.status(200).json(updatedProduct);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You are not an Admin user");
    }
});


//@describe delete Product
//@describe DELETE to remove product
//@access private
router.delete("/:id", verifyToken, async (req,res) => {
    if(req.user.isAdmin){
        try{
            const productDeleted = await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Product has been Deleted");
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You are not an Admin user");
    }
});

//@describe get product
//@describe GET to get Product details
//@access private
router.get("/find/:id", async (req,res) => {
        try{
            const getProduct = await Product.findById(req.params.id);
            res.status(200).json(getProduct);
        }
        catch(err){
            res.status(500).json(err);
        }

});

//@describe get all products
//@describe GET to get all prroduct
//@access private

router.get("/findall", async (req,res) => {
        const query_Category = req.query.category;
        
        try{ 
            
            var products;

            if(query_Category){
                products = await Product.find({
                    category : query_Category
                    })
                }
            else{
                products = await Product.find();
                }  
                res.status(200).json(products);
            }
        catch(err){
            res.status(500).json(err);
        }
});


module.exports = router;