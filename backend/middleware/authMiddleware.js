const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers.authorization || localStorage.getItem('token'); // Incluye el token de localStorage.

  if (!token) {
    return res.status(403).send('Acceso denegado. No se proporcionó un token.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Token inválido:', error.message);
    res.status(401).send('Token inválido.');
  }
};
