const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const employeeID = decodedToken.employeeID;
    if (req.body.employeeID && req.body.employeeID !== employeeID) {
        console.log('not logged in')
        throw 'Invalid employee ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};