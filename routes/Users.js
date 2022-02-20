const express = require('express')
const router = express.Router()
const { Users } = require("../models")
const bcrypt = require("bcryptjs")
const { validateToken } = require("../middlewares/AuthMiddleware")
const token = require("jsonwebtoken")

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
            else {
                const accessToken = token.sign({
                    username: user.username,
                    id: user.id
                }, "importantsecret")
                res.json({
                    accessToken,
                    username,
                    id: user.id
                })
            }
        })
    }
})

router.get("/auth", validateToken, (req, res) => {
    res.json(req.user)
})

router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id
    const basicInfo = await Users.findByPk(id, { attributes: { exclude: ["password"] } })
    res.json(basicInfo)
})

module.exports = router