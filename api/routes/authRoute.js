const router = require("express").Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')


//Sign-up
router.post("/signup", async (req,res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_ENC_KEY).toString(),
    })

    try {
        const saveduser = await newUser.save();
        res.status(200).json(saveduser);
      } catch (err) {
        res.status(500).json(err);
      }
});

//Sign-in

router.post("/signin",async (req, res) => {
     

     try{
       
       const user = await User.findOne({username : req.body.username});
   
       try{
       const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_ENC_KEY);
       const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
     
       if(OriginalPassword!== req.body.password)
       {
        res.status(401).json("Incorrect Password!");
       }
       
       else{ 
       const accessToken = jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin
       }, process.env.JWT_SEC_KEY,
       {
        expiresIn : "3d"
       });

       const {password, ...others} = user._doc;
       res.status(200).json({...others,accessToken});
       }
      }
      catch{
        res.status(401).json("Incorrect Username!");
      }
    }
     catch (err){
        res.status(500).json(err);
     }
});

module.exports = router;