"use-strict;"

const express = require("express");

const app = express()
app.set("view engine", "ejs")


// setting the URL ands the Access token
// let accessToken = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkiLCJpYXQiOjE2MTg2NDE5ODIsImV4cCI6MTkzNDAwMTk4MiwibmJmIjoxNjE4NjQxOTgyLCJqdGkiOjMwOTY5MDgyLCJzdWIiOjMwOTY5MDgyfQ.Gt4wQm95SAiuDs4HF6VvT9H-0g-lFX8r_JBFU7ZiLGk;
const baseUrl = 'https://api2.hiveos.farm/api/v2';


app.get("/", (req, res)=>{
    doLogin('bradshaw17', 'MrSirdiq123')
    .then(getFarms)
    .then(farms => console.log('farms=', farms));

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
                console.error(data.message || 'Response error');
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
function getFarms() {
    return fetch(`${baseUrl}/farms`, {
        method: 'GET',
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

    res.render("index")
})


app.listen(3030, ()=>{
    console.log("Server running on port 3030")
})

