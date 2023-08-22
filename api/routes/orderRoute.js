const router = require("express").Router();
const { verifyToken } = require("./verifyToken");
const Order = require('../models/Order');

//@describe create Order
//@describe POST to create Order
//@access private
router.post("/", async (req,res) => {
   
        const newOrder = new Order(req.body)
        try{
            const savedOrder = await newOrder.save();
            savedOrder.save();
            res.status(200).json(savedOrder)
        }
        catch(err){
            res.status(500).json(err);
        }
    
});



//@describe update Order
//@describe PUT to update Order
//@access private
router.put("/:UserId", verifyToken, async (req,res) => {
    if(req.user.id === req.params.UserId){
        try{
            const updatedOrder = await Order.findOneAndUpdate({userId : req.params.UserId},
                { $set: req.body}, 
                {new : true}
            );

            res.status(200).json(updatedOrder);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You are not an Authorized user");
    }
});



//@describe delete Order
//@describe DELETE to remove Order
//@access private
router.delete("/:UserId", verifyToken, async (req,res) => {
    if(req.user.id === req.params.UserId){
        try{
            const orderDeleted = await Order.findOneAndDelete({userId : req.params.UserId});
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



//@describe get User Order
//@describe GET to get user Order
//@access private
router.get("/find/:UserId",verifyToken, async (req,res) => {
    if(req.user.id === req.params.UserId){
        try{
            const getOrder = await Order.find({userId : req.params.UserId});
            res.status(200).json(getOrder);
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