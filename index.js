const express = require('express')
const app = express()
const db = require("./models")


db.sequelize.sync().then(()=>{
    app.listen(3306, ()=>{
        console.log("server is running on port 3306");
    })
})
