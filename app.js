"use-strict;"

// modules layers
const express = require("express");
const doLogin = require('./modules/login')
const getFarms = require("./modules/getFarms")

const app = express()
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

// implementing dotenv file
require("dotenv").config()

// setting the URL ands the Access token
let accessToken = process.env.AccessToken
const baseUrl = 'https://api2.hiveos.farm/api/v2';

let results = {
    "datalist"  : [],
}



// Home page for the data
app.get("/", (req, res)=>{
    // doLogin('bradshaw17', 'MrSirdiq123', baseUrl)
    getFarms(baseUrl, accessToken)
    .then(farms => {
        let lists = farms.data;
        lists.map((list)=>{
            console.log(list.id, list.name)
        })
    });
     res.render("index")
})

app.get("/login", (req, res)=>{
    res.render("login")
})
app.post("/", (req, res)=>{
    getFarms(baseUrl, accessToken)
    .then(farms =>{
        results.datalist = farms.data;
        console.log(results.datalist)
    })
    res.render("index")
})

7/
app.listen(3030, ()=>{
    console.log("Server running on port 3030")
})

