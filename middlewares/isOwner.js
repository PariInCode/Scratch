const jwt = require("jsonwebtoken")
const ownerModel = require("../models/ownermodel")

module.exports  = function isOwner(req,res,next){
  
    let token = req.cookies.token;

    if(!token){
        return res.redirect("/owners/login");
    }

    let data = jwt.verify(token, process.env.JWT_KEY);

    req.owner = data;

    next();
}