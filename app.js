"use-strict;"

// modules layers
const express = require("express");
const doLogin = require('./modules/login')
const getFarms = require("./modules/getFarms")

const app = express()
app.set("view engine", "ejs")

// implementing dotenv file
require("dotenv").config()

// setting the URL ands the Access token
let accessToken = process.env.AccessToken
const baseUrl = 'https://api2.hiveos.farm/api/v2';



// Home page for the data
app.get("/", (req, res)=>{
    // doLogin('bradshaw17', 'MrSirdiq123', baseUrl)
    getFarms(baseUrl, accessToken)
    .then(farms => console.log('farms=', farms));
     res.render("index")
})

app.get("/login", (req, res)=>{
    res.render("login")
})
app.post("/login", (req, res)=>{
    res.render("index")
})

7/
app.listen(3030, ()=>{
    console.log("Server running on port 3030")
})

