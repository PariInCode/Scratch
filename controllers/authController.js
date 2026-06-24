const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/usermodel");

module.exports.registerUser = async function(req, res) {
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email : email  });

        if (user) {
            return res.send("user already exists");
        }

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(error, hash) {
                if (error) {
                    return res.send(error.message);
                } else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    });

                    let token = generateToken(user);
                    res.cookie("token", token);
                    req.flash("success", "Welcome to Scratch, Continue shopping!");
                    res.redirect("/shop");
                }
            });
        });

    } catch (error) {
        res.status(500).send("Error registering user");
    }
};

module.exports.loginUser = async function(req,res){
    let{email,password} = req.body;

    let user = await userModel.findOne({email:email});
    if(!user) return res.send('Email or Password is incorrect');

    bcrypt.compare(password , user.password , function(err,result){
        if(result){
            let token = generateToken(user);
            res.cookie('token', token);
            res.redirect("/shop");
        }
        else{
            res.send('Email or Password is incorrect');
        }
    })
};

module.exports.logoutUser = function(req,res){
    res.clearCookie("token");
    res.redirect("/");
}