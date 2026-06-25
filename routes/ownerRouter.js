const express = require("express");
const router = express.Router();
const isOwner = require("../middlewares/isOwner")
const ownerModel = require("../models/ownermodel");
const productModel = require("../models/productmodel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV === "development") {

    router.post("/create", async function (req, res) {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res
                .status(503)
                .send("sorry owners already exists");
        }
        console.log(req.body);
        let { fullname, email, password } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        let createdOwner = await ownerModel.create({
            fullname: fullname,
            email: email,
            password: hashedPassword,

        })
        res.redirect("/owners/admin");

    });
}




router.get("/login", function (req, res) {
    res.render("owner-login");
});

router.post("/login", async function (req, res) {
    

    let { email, password } = req.body;
   

    let owner = await ownerModel.findOne({ email });
   


    if (!owner) {
        console.log("Owner not found");
        req.flash("error", "Invalid credentials");
        return res.redirect("/owners/login");
    }

    let result = await bcrypt.compare(password, owner.password);
    
    console.log(result);

    if (result) {

        let token = jwt.sign(
            {
                email: owner.email,
                id: owner._id
            },
            process.env.JWT_KEY
        );
        

    

        res.cookie("token", token);

        return res.redirect("/owners/admin");
    }


    

    res.redirect("/owners/login");
});

router.get("/admin", isOwner, async function (req, res) {
    let success = req.flash("success");
    let products = await productModel.find();


    res.render("createproducts", {
        success,
        products,

    });


});

module.exports = router;