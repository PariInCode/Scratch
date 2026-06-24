const express = require("express");
const router = express.Router();
const isOwner = require("../middlewares/isOwner")
const ownerModel = require("../models/ownermodel");
const productModel = require("../models/productmodel")

if (process.env.NODE_ENV === "development") {
    
    router.post("/create",async function (req, res) {
        let owners = await ownerModel.find();
        if(owners.length>0){
            return res
            .status(503)
            .send("sorry owners already exists");
        }
        let {fullname,email,password}=req.body;
        let createdOwner = await ownerModel.create({
            fullname: fullname,
            email: email,
            password: password,
            
        })
        res.status(201).send("we can create a new owner");
        
    });
}
router.get("/login", function(req,res){
    res.render("owner-login");
});

router.post("/login", async function(req,res){

    let {email,password} = req.body;

    let owner = await ownerModel.findOne({email});

    if(!owner){
        req.flash("error","Invalid credentials");
        return res.redirect("/owners/login");
    }

    let result = await bcrypt.compare(password, owner.password);

    if(result){

        let token = jwt.sign(
            {email: owner.email, id: owner._id},
            process.env.JWT_KEY
        );

        res.cookie("token", token);

        return res.redirect("/owners/admin");
    }

    res.redirect("/owners/login");
});

router.get("/admin", isOwner ,  async function (req, res) {
    let success = req.flash("success");
    let products = await productModel.find();
    

    res.render("createproducts", {
        success,
        products,
        
    });


});

module.exports = router;