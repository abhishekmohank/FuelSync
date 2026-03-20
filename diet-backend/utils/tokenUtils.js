const jwt = require('jwt-simple');

const generateToken = (userId) => {
  const payload = {
    userId,
    iat: Math.floor(Date.now() / 1000),
  };
  return jwt.encode(payload, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
};
