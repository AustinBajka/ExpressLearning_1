import express from 'express';
import path from 'path';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import { error } from 'console';


const port = process.env.PORT || 8080;


const app = express();

// ** Logger middleware ** //
app.use(logger);

// ** Body parser middleware
/*
    handles
*/
app.use(express.json());
app.use(express.urlencoded({extended: false})) // choosing to use the querystring library over qs library




// setup static folder
// app.use(express.static(path.join(__dirname, 'public')));


// ** Moved to the Routes ** //
/*
app.get('/api/posts', (req, res) => {
    console.log('req.query', req.query);
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

app.get('/api/posts/:id', (req, res) => {
    console.log(req.params.id);
    const id = parseInt(req.params.id);
    const foundPost = posts.find((post) => post.id === id);

    if (!foundPost) {
        res.status(404).json({"message": `Post with ${id} not found`});
    }
    res.status(200).json({"message": `Found post foundPost`});
});

*/

// ** Routes ** //
/*
    NOTE:
    here we are going to set a 'prefix' to what posts is, so we can then go to the `posts` route, and remove the prefix and just put the explicit routes.

    unsure how I feel about this, might just prefer to keep the full url in posts to be explicit and colocate? 

    let's do it this way for now.
*/
app.use('/api/posts', posts);

// ** Global Catchall Error handling ** //
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})


// ** Error handler ** //
app.use(errorHandler);

// ** GET ** //

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html') );
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html') );
});


app.listen(port, () => console.log('Server running on port 8080'));