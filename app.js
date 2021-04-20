"use-strict;"

const express = require("express");
// const fetch = require("node-fetch");
const doLogin = require('./modules/login')
const getFarms = require("./modules/getFarms")

const app = express()
app.set("view engine", "ejs")

// implementing dotenv file
require("dotenv").config()

// setting the URL ands the Access token
let accessToken = process.env.AccessToken
const baseUrl = 'https://api2.hiveos.farm/api/v2';


console.log(accessToken)
// Home page for the data
app.get("/", (req, res)=>{
    // doLogin('bradshaw17', 'MrSirdiq123', baseUrl)
    getFarms(baseUrl, accessToken)
    .then(farms => console.log('farms=', farms));
     res.render("index")
})



app.listen(3030, ()=>{
    console.log("Server running on port 3030")
})

