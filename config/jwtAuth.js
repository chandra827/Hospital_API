const jwt = require("jsonwebtoken");

// Middleware function for authentication
module.exports.authenticationToken = function(req, res, next){

    // Retrieve the Authorization header from request headers
    const authHeader = req.headers["authorization"];

    // Extract the token from the Authorization header
    const token = authHeader && authHeader.split(" ")[1];

    // If token is not found or null, respond with status code 401 (Unauthorized)
    if(token == null) return res.sendStatus(401);

    // Verify the token using the SECRET_TOKEN stored in the environment variable
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user)=>{
        // If the token cannot be verified or an error occurs, respond with status code 403 (Forbidden)
        if(err) return res.sendStatus(403);

        // If token is successfully verified, attach the user information to the req object
        req.username = user.username;
        req.password = user.password;

        // Call the next middleware or route handler
        next();
    });
};
