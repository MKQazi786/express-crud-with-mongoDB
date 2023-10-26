import express from 'express';
let router = express.Router();

router.get('/comment/:postId/:commentId', (req, res, next) => {
    let commentBody = req.body;
    console.log("your comment is created", new Date());
    res.send("your comment is created " + new Date());
});

router.get('/comments/:postId', (req, res, next) => {
    let commentBody = req.body;
    console.log("your comments is created", new Date());
    res.send("your comments is created " + new Date());
});

router.put('/comment/:postId/:commentID', (req, res, next) => {
    let commentBody = req.body;
    console.log("your comment is SUCCESFULLY commented", new Date());
    res.send("your comment is SUCCESFULLY commented " + new Date());
});

router.delete('/comment/:postId/:commentId', (req, res, next) => {
    let commentBody = req.body;
    console.log("your comment is deleted", new Date());
    res.send("your comment is deleted " + new Date());
});

export default router;