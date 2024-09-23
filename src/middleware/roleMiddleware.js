const roleMiddleware = (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: 'Please authenticate.' });
      }
  
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied.' });
      }
  
      next();
    };
  };
  
  module.exports = roleMiddleware;
