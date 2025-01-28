import express from 'express';
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

router.get('/', (req, res) => {
    if (!req.query.limit) {
        return res.status(200).json(posts);
    }
    const limit = parseInt(req.query.limit);
    const limitIsNotAnumber = isNaN(limit);
    if (limitIsNotAnumber) {
        return res.status(400).json(`Please provide a number for the limit, provided: ${limit}`);
    }
    if (!limitIsNotAnumber && limit < 1){
       return res.status(400).json("Please provide a limit greater than 0");
    }

    return res.status(200).json(posts.slice(0, limit));

});


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

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const foundPost = posts.find((post) => post.id === id);

    if (!foundPost) {
        const error = new Error(`Post with ${id} not found`);
        error.status = 404;
        return next(error)
    }
    res.status(200).json({"message": `Found post foundPost: ${id}`, "result": foundPost});
});


// ** POST ** //
router.post('/', (req, res, next) => {
    const { title, body } = req.body;
    const newPost = {
        id: posts.length + 1,
        title,
        body,
    };

    if(!newPost.title) {
        const error = new Error("Please provide a title");
        error.status = 400;
        return next(error);
    }

    posts.push(newPost);
    res.status(201).json({ "message": "Successfully added new Post", "posts": posts });
})

// ** PUT / Update ** //
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const idIsNotANumber = isNaN(id);

    if(!id) {
        return res.status(400).json({"message": "No ID was provided. Please provide a valid ID number."});
    }

    if (idIsNotANumber) {
        return res.status(400).json({"message": "Invalid parameter provided, ID must be a number."});
    }

    const idAsNumber = parseInt(id);
    const matchingPost = posts.find((post) => post.id === idAsNumber);
    
    if (!matchingPost){
        return res.status(404).json({"message": "No matching post found."});
    }
    matchingPost.title = req.body.title;

    res.status(200).json({"message": `Updated post: ${id}.`, "posts": posts});
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const idIsNotANumber = isNaN(id);

    if(!id) {
        return res.status(400).json({"message": "No ID was provided. Please provide a valid ID number."});
    }

    if (idIsNotANumber) {
        return res.status(400).json({"message": "Invalid parameter provided, ID must be a number."});
    }

    const idAsNumber = parseInt(id);

    const foundPost = posts.find((post) => post.id === idAsNumber);

    if (!foundPost) {
        return res.status(404).json({"message": "Unable to find post"});
    }

    posts = posts.filter((post) => post.id !== idAsNumber);
    
    res.status(200).json({"message": `Removed post with ID: ${idAsNumber}`, "posts": posts });

})

// Export router
export default router;