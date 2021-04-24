"use-strict;"

// modules layers
const express = require("express");
const bodyParser = require("body-parser")
const session = require("express-session")
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

// Home page for the data
app.get("/", (req, res)=>{
    // doLogin('bradshaw17', 'MrSirdiq123', baseUrl)
    getFarms(baseUrl, accessToken)
    .then(farms =>{
        results = farms.data;
        results.map((result)=>{
            if(result.name == "FinalTest"){
                let details = {
                    name : result.owner.name,
                    owner : result.owner.login,
                    worker_count : result.workers_count,
                    Rig_count : result.rigs_count,
                    Disabled_rigs : result.disabled_rigs_count ,
                    id : result.owner.id
                }
                console.log(result)

                // temperature array
                let Temp = [ result.gpu_red_temp, result.asic_red_temp, result.gpu_red_fan, result.asic_red_fan,
                result.gpu_red_cpu_temp, result.gpu_red_mem_temp,
                 result.gpu_red_asr, result.asic_red_asr, result.gpu_red_la, result.asic_red_la ]

                //  money content
                const money = result.money
                let moneyList = [ money.is_paid, money.balance, money.discount, money.daily_cost,
                     money.monthly_cost, money.daily_price ,
                      money.daily_use_rigs, money.daily_use_asics, money.price_per_rig, money.price_per_asic
                 ]

                //  stats content
                const stats = result.stats;
                let First_stats = [
                    stats.workers_total, stats.workers_offline, stats.workers_online,
                     stats.workers_overheated, stats.workers_overloaded,
                     stats.rigs_total, stats.rigs_online, stats.rigs_offline,
                ]
                let second_stats = [
                    stats.gpus_total, stats.gpus_online, stats.gpus_offline,
                    stats.asics_total, stats.asics_online, stats.asics_offline, stats.boards_total,
                    stats.boards_online, stats.boards_offline, stats.boards_overheated, 
                    stats.cpus_online, stats.power_draw
                ]

                //  content to display
                res.render("index", { localname : details.name , 
                    owner : details.owner,
                     worker : details.worker_count,
                      rig_count : details.Rig_count,
                       disabled_rigs : details.Disabled_rigs,
                       id : details.id,
                       temp : Temp,
                       money : moneyList,
                       first_stats : First_stats,
                       second_stats : second_stats
                    })
            }
        })
        })
})

app.get("/login", (req, res)=>{
    res.render("login")
})
app.post("/", (req, res)=>{
  res.redirect("/")
})

7/
app.listen(3030, ()=>{
    console.log("Server running on port 3030")
})

