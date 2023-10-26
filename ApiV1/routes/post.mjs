import express from 'express';
import { nanoid } from 'nanoid'
import {client} from './../../mongodb.mjs'

const db = client.db("cruddb")
const col = db.collection("posts");


let  router = express.Router()

//not recommemnded only for practice
let posts = [
    {
        id: nanoid(),
        title: "Muhammad! muhammad Khubaib naam hai mera! ",
        text: "me jhuke ga nhi saala"
    }
]

router.post('/post', async (req, res, next) => {
    console.log("your post is SUCCESFULLY POSTED !", + new Date())

    if (!req.body.title || !req.body.text) {
        res.status(403)
        res.send(`required parameter is missing,
        example request body:
        {
            title: "Muhammad! muhammad Khubaib naam hai mera! ",
            text: "me jhuke ga nhi saala"
        }`
        )
        return
    }

    const insertResponse = await col.insertOne({
        id: nanoid(),
        title: req.body.title,
        text: req.body.text
    });

    console.log("insertResponse: ", insertResponse)

    res.send("your post is SUCCESFULLY POSTED! " + new Date())
})

router.get('/posts', (req, res, next) => {
    console.log('you get all post', new Date());
    res.send(posts);
})

router.get('/post/:postId', (req, res, next) => {

    if (!req.params.postId) {
        res.status(403).send(`post id is must be valid id `)
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === Number(req.params.postId)) {
            res.send(posts[i])
            return
        }
    }

    res.send("post not found with id " + req.params.postId + ' ' + new Date())
    console.log(`you get a post with this ${req.params.postId}`, + new Date())
})

router.get('/posts/ ', (req, res, next) => {
    console.log("your posts is created", + new Date())
    res.send("your posts is created! " + new Date())
})



router.put('/post/:postId', (req, res, next) => {
    // console.log("your post is SUCCESFULLY updated", + new Date())

    if (!req.body.postId || !req.body.title || !req.body.text) {
        res.status(403)
        res.send(`required parameter is missing,
                        example request body:
                        {
                            title: "Muhammad! muhammad Khubaib naam hai mera! ",
                            text: "jo dil kre likho"
                        }`
        )
    }

    for (let i = 0; i < posts.length; i++) {
        if ((req.params.postId) === posts[i].id) {

            posts[i].title = req.body.title;
            posts[i].text = req.body.text;

        }
    }
    res.send("your post is SUCCESFULLY updated" + new Date())
})

router.delete('/post/:postId', (req, res, next) => {
    console.log("your post is deleted", + new Date())

    if (!req.params.postId) {
        res.status(403).send(`post id must be a valid id`)
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            posts.splice(i, 1)
            res.send('post deleted with id ' + req.params.postId + new Date());
            return;
        }
    }

    res.send('post not found with id ' + req.params.postId);

})

export default router