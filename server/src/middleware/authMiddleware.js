const { verifyToken } = require('../utils/tokenUtils');
const logger = require('../utils/logger').logger;

const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = verifyToken(token);
    // @ts-ignore
    req.user = decoded.id;
    next();
  } catch (error) {
    logger.error(`JWT verification error: ${error.message}`);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;