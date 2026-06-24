const express = require("express");
const router = express.Router();
const  isloggedin  = require("../middlewares/isLoggedIn")
const productModel = require("../models/productmodel");
const userModel = require("../models/usermodel")


router.get("/",function(req,res){
    let error = req.flash("error")
    res.render("index",{error , loggedin: false})
});

router.get("/shop", isloggedin ,async function(req,res){
    let products = await productModel.find();
    res.render("shop",{products , success:req.flash("success")});
})

router.get("/cart", isloggedin ,async function(req,res){
    let user = await userModel
         .findOne({email:req.user.email})
         .populate("cart");
         
         const bill = (Number(user.cart[0].price)+20)-Number(user.cart[0].discount);

    res.render("cart", { user , bill  });
    
})

router.get("/addtocart/:id", isloggedin ,async function(req,res){
    let user = await userModel.findOne({email:req.user.email});
    let id = req.params.id;
    user.cart.push(id);
    await user.save();
    let success = req.flash("success","Product added to cart successfully")
    res.redirect("/shop",  );

    
})

router.get("/account", isloggedin, async function(req, res) {
    let user = await userModel.findOne({
        email: req.user.email
    });

    res.render("account", { user });
});

router.get("/logout", isloggedin, function(req, res) {
    res.clearCookie("token");
    res.redirect("/");
});

module.exports=router