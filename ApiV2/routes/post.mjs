import express from 'express';
let router = express.Router()

router.get('/post/:userId/:postId', (req, res, next) => {
    console.log("your post is created", + new Date())
    res.send("your post is created" + new Date())
})

router.get('/posts/:userId', (req, res, next) => {
    console.log("your posts is created", + new Date())
    res.send("your posts is created" + new Date())
})

router.post('/post', (req, res, next) => {
    console.log("your post is SUCCESFULLY POSTED", + new Date())
    res.send("your post is SUCCESFULLY POSTED" + new Date())
})

router.put('/post/:userId', (req, res, next) => {
    console.log("your post is SUCCESFULLY POSTED", + new Date())
    res.send("your post is SUCCESFULLY POSTED" + new Date())
})

router.delete('/post/:userId', (req, res, next) => {
    console.log("your post is deleted", + new Date())
    res.send("your post is deleted" + new Date())
})

export default router