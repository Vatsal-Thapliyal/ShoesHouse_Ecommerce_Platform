const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    if(!authHeader){
        res.status(401).json("You are not authenticated");
    }
    else{
        jwt.verify(authHeader.split(" ")[1], process.env.JWT_SEC_KEY, (err,user) => {
            if(err){
                res.status(403).json("Token is not valid or it has expired.");
            }
            else{
                req.user = user;
                next();
            }
        });
    }
};

module.exports = { verifyToken }; 