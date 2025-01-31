
/*
    @desc  Get all posts
    @route GET /api/posts
*/

const getPosts = (req, res) => {
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

};

/*
    @desc Get a single post by ID
    @route GET /api/posts/:id
*/

const getPostById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const foundPost = posts.find((post) => post.id === id);

    if (!foundPost) {
        const error = new Error(`Post with ${id} not found`);
        error.status = 404;
        return next(error)
    }
    res.status(200).json({"message": `Found post foundPost: ${id}`, "result": foundPost});
};

/*
    @desc Create new post
    @route POST /api/posts/:id
*/

const createPost = (req, res, next) => {
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
};

/*
    @desc Update existing post by ID
    @route PUT /api/posts/:id
*/

const updatePostById = (req, res) => {
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
};


/*
    @desc Delete existing post by ID
    @route DELETE /api/posts/:id
*/

const deletePostById = (req, res) => {
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

};