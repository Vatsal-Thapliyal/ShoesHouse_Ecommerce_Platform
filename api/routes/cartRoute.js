const router = require("express").Router();
const { verifyToken } = require("./verifyToken");
const Cart = require('../models/Cart');

//@describe create Cart
//@describe POST to create Cart
//@access private
router.post("/", async (req,res) => {
   
        const newCart = new Cart(req.body)
        try{
            const savedCart = await newCart.save();
            savedCart.save();
            res.status(200).json(savedCart)
        }
        catch(err){
            res.status(500).json(err);
        }
    
});



//@describe update Cart
//@describe PUT to update Cart
//@access private
router.put("/:UserId", verifyToken, async (req,res) => {
    if(req.user.id === req.params.UserId){
        try{
            const updatedCart = await Cart.findOneAndUpdate({userId : req.params.UserId},
                { $set: req.body}, 
                {new : true}
            );

            res.status(200).json(updatedCart);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You are not an Authorized user");
    }
});



//@describe delete Product
//@describe DELETE to remove cart
//@access private
router.delete("/:UserId", verifyToken, async (req,res) => {
    if(req.user.id === req.params.UserId){
        try{
            const cartDeleted = await Cart.findOneAndDelete({userId : req.params.UserId});
            res.status(200).json("Cart has been Deleted");
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You are not an Authorized user");
    }
});



//@describe get User Cart
//@describe GET to get user Cart
//@access private
router.get("/find/:UserId",verifyToken, async (req,res) => {
    if(req.user.id === req.params.UserId){
        try{
            const getCart = await Cart.findOne({userId : req.params.UserId});
            res.status(200).json(getCart);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You are not an Authorized user");
    }    
});


module.exports = router;