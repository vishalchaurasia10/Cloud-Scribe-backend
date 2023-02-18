const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path: '../config.env'})


const fetchUser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.id = data.id;
        next();
    }
    catch (error) {
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }}

module.exports = fetchUser;