// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
const token = req.cookies.token || '';
    if (!token) {
    return res.redirect('/auth/login'); // Redirigimos al login si no hay token
}

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
} catch (error) {
    return res.redirect('/auth/login');
}
};
