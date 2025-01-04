// /middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  // Leer token de varias fuentes
  const token =
    req.body.token || req.query.token || req.headers.authorization;

  if (!token) {
    return res
      .status(403)
      .send('Acceso denegado. No se proporcionó un token.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send('Token inválido.');
  }
};
