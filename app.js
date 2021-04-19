"use-strict;"

const express = require("express");
const fetch = require("node-fetch")

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
    // doLogin('bradshaw17', 'MrSirdiq123')
    getFarms()
    .then(farms => console.log('farms=', farms));
     res.render("index")
})



// activating login to the account
function doLogin(login , password) {
    return fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({login, password})
    }).then(r => {
        if (!r.ok) {
            r.json().then(data => {
                console.error(data.message || ' Response error');
            });
            return Promise.reject(r);
        }
        else {
            return r.json().then(data => {
                accessToken = data.access_token;
                return data;
            });
        }
    })
}

// Getting details function
function getFarms() {
    return fetch(`${baseUrl}/farms`, {
        method : 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    }).then(r => {
        if (!r.ok) {
            r.json().then(data => {
                console.error(data.message || 'Response error');
            });
            return Promise.reject(r);
        }
        else {
            return r.json();
        }
    });
}


app.listen(3030, ()=>{
    console.log("Server running on port 3030")
})

