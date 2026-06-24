const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config")
const productModel = require("../models/productmodel")

router.post("/create", upload.single("image"), async  function(req,res){
    try{
    let {name,image,price,discount,panelcolor,bgcolor,textcolor} = req.body;
    let product = await productModel.create({
        name: name,
        image: req.file.buffer,
        price: price,
        discount: discount,
        panelcolor: panelcolor,
        bgcolor: bgcolor,
        textcolor: textcolor,
    });
    req.flash("success", "Product created successfully");
    res.redirect("/owners/admin");
} catch (error) {
    res.status(500).send("Error creating product");
}
});

module.exports= router;