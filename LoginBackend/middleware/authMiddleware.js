// authMiddleware.js


const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try{
        let token = req.header('x-token');
        if(!token){
            return res.status(400).send('Token Not found');
        }
        let decoded = jwt.verify(token,'jwtSecret');
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Invalid token')
    }
};

module.exports = verifyToken;