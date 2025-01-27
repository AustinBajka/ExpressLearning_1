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

router.get('/', (req, res) => {
    console.log('req.query', req.query);
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

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    const id = parseInt(req.params.id);
    const foundPost = posts.find((post) => post.id === id);

    if (!foundPost) {
        res.status(404).json({"message": `Post with ${id} not found`});
    }
    res.status(200).json({"message": `Found post foundPost: ${id}`, "result": foundPost});
});


export default router;