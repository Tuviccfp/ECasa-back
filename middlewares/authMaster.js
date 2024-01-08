const jwt = require('jsonwebtoken');
const secret = process.env.JWT_TOKEN;

const createToken = (user) => {
    const expiresIn = '7d';
    return jwt.sign({ user }, secret, { expiresIn });
}

const verifyToken = (req, res, next) => {
    const token = req.headers['xoxota'];

    if(!token) {
        console.log('Token não autorizado.');
        return res.status(401).json({message: "Token não autorizado."})
    }

    jwt.verify(token, secret, (err, user) => {
        if(err) {
            console.log('Error: ', err);
            return res.status(403).json({ message: err.message });
        }
        req.user = user;
        next();
    });
}

module.exports = { createToken, verifyToken }