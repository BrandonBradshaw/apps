"use-strict;"

// modules layers
const express = require("express");
const bodyParser = require("body-parser")
const doLogin = require('./modules/login')
const getFarms = require("./modules/getFarms")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
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

// creating Details section
 let Details = {
     name : "",
     owner : "",
     worker : "",
     rig_count : ""
 }

// Home page for the data
app.get("/", (req, res)=>{
    // doLogin('bradshaw17', 'MrSirdiq123', baseUrl)
    getFarms(baseUrl, accessToken)
    .then(farms => {
        console.log(req.body)
        let lists = farms.data;
        lists.map((list)=>{
            if(list.name == "FinalTest"){
                console.log(list)
                res.render("index", {
                    Username : Details.name
                })
            }
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
    console.log(req.body)
    res.render("index")
})

7/
app.listen(3030, ()=>{
    console.log("Server running on port 3030")
})

