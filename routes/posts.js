import express from 'express';
import { createPost, getPosts, getPostById, createPost, deletePostById } from '../controllers/postController'
const router = express.Router();
// ** Variables as DB Stand-in ** //
    let posts = [
        {
            id: 1,
            title: 'Post One',
            body: 'This is post one'
        },
        {
            id: 2,
            title: 'Post Two',
            body: 'This is post two'
        },
        {
            id: 3,
            title: 'Post Three',
            body: 'This is post three'
        }
    ];

/*

NOTE: This is an example of a logger being used to run on a specific Route.
We are going to instead, run it on 

    const logger = (req, res, next) => {
        console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
        next();
    }

*/

router.get('/', getPosts);


/*
NOTE: this is WITHOUT error handling, though we kind of have it with the way I did it with the !foundPost, however, better way to do it below.

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const foundPost = posts.find((post) => post.id === id);

    if (!foundPost) {
        res.status(404).json({"message": `Post with ${id} not found`});
    }
    res.status(200).json({"message": `Found post foundPost: ${id}`, "result": foundPost});
});

*/

router.get('/:id', getPostById);


// ** POST ** //
router.post('/', updatePostById)

// ** PUT / Update ** //
router.put('/:id' )

router.delete('/:id')

// Export router
export default router;