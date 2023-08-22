const router = require("express").Router();
const { verifyToken } = require("./verifyToken");
const User = require('../models/User');

//@describe update user
//@describe PUT to update
//@access private
router.put("/:id", verifyToken, async (req,res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new : true}
            );

            res.status(200).json(updatedUser);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You are not an authenticated user");
    }
});


//@describe delete user
//@describe DELETE to delete user
//@access private
router.delete("/:id", verifyToken, async (req,res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        try{
            const userDeleted = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been Deleted");
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You are not an authenticated user");
    }
});

//@describe get all user
//@describe GET to get all user
//@access private
router.get("/find/:id", verifyToken, async (req,res) => {
    if(req.user.isAdmin){
        try{
            const getUser = await User.findById(req.params.id);
            const {password, ...others} = getUser._doc;
            res.status(200).json({...others});
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You are not an authenticated user");
    }
});

//@describe get all user
//@describe GET to get all user
//@access private

router.get("/findall", verifyToken, async (req,res) => {
    if(req.user.isAdmin){
        try{
            const getUser = await User.find();
            const {password, ...others} = getUser._doc;
            res.status(200).json({...others});
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You are not an authenticated user");
    }
});


module.exports = router;