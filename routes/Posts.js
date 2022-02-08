const express = require('express')
const router = express.Router()
const { Posts } = require("../models")

router.get("/",(req, res)=>{
    res.json("Hello World")
})
router.post("/",async (req,res)=>{
    const post = req.body
    console.log("hahahahaha", req);
    await Posts.create(post)
    res.json(post)
})

module.exports = router