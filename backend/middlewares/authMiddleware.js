// Step 1: Middleware for Token Verification
const jwt = require('jsonwebtoken');

// Middleware to verify JWT and get user ID
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Extract token from the request header

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id; // Access the user ID from the decoded token
    next();
  });
};

module.exports = {
    verifyToken,
  };