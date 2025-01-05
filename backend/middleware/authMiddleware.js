const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.query.token || req.headers.authorization;
  if (!token) {
      return res.status(403).send('Acceso denegado. No se proporcionó un token.');
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      req.token = token; // Adjuntar el token a la solicitud
      next();
  } catch (error) {
      console.error('Token inválido:', error.message);
      return res.status(401).send('Token inválido.');
  }
};


