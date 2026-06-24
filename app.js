const express = require('express');
const app = express();

const cookieParser=require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config({ path: './config/.env' });

const ownersRouter = require("./routes/ownerRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const indexRouter = require("./routes/index");

const db = require("./config/mongoose-connection");

app.use(cookieParser());
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
)
app.use(flash());



app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(3000);

