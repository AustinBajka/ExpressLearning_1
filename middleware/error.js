const errorHandler = (err, req, res, next) => {
    if (err.status) {
        const errorMessage = err.message ?? 'An error occurred';
        return res.status(err.status).json({ "message": errorMessage});
    }

    res.status(500).json({"message": 'Unknown error occurred'});
}

export default errorHandler;