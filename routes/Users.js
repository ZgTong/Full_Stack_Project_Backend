const express = require('express')
const router = express.Router()
const { Users } = require("../models")
const bcrypt = require("bcrypt")
// router.get("/", async (req, res) => {
//     const listOfPosts = await Posts.findAll()
//     res.json(listOfPosts)
// })
router.post("/", async (req, res) => {
    const { username, password } = req.body
    bcrypt.hash(password, 10).then((hash) => {
        console.log(hash)
        Users.create({
            username,
            password: hash
        })
        res.json("add user successfully!")
    })
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body

    const user = await Users.findOne({ where: { username } })
    if (!user) res.json({ error: "User doesn't exist" })
    else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) res.json({ error: "Wrong User Information" })
            else res.json("Login success!")
        })
    }

})
module.exports = router