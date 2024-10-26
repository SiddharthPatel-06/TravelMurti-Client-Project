const errorHandlingMiddleware = (err, req, res, next) => {
    // Log error details for debugging
    console.error("Error occurred:", {
        message: err.message || "Internal Server Error",
        stack: err.stack || "No stack trace available",
        method: req.method,
        url: req.url,
        params: req.params,
        body: req.body,
        // Include additional info if available
        file: err.file || "Not specified",
        line: err.line || "Not specified",
    });

    // Send a response to the client with detailed error info
    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "An unexpected error occurred.",
        details: {
            method: req.method,
            url: req.url,
            file: err.file || "Not specified",
            line: err.line || "Not specified",
        },
    });
};

module.exports = errorHandlingMiddleware;
