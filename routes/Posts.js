const express = require('express')
const router = express.Router()
const { Posts, Likes } = require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware")
router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll({
        include: [Likes]
    })
    res.json(listOfPosts)
})
router.post("/", validateToken, async (req, res) => {
    const post = req.body
    post.username = req.user.username
    post.UserId = req.user.id
    await Posts.create(post)
    res.json(post)
})

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id)
    res.json(post)
})

router.delete(`/:postId`, validateToken, async (req, res) => {
    const postId = req.params.postId
    await Posts.destroy({
        where: {
            id: postId
        }
    })
    return res.json("delete success")
})

router.get("/byuid/:id", async (req, res) => {
    const id = req.params.id
    const listOfPost = await Posts.findAll({ where: { UserId: id }, include: [Likes] })
    res.json(listOfPost)
})

module.exports = router