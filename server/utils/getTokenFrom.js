const getTokenFrom = (req, res, next) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);

    next();
  } else {
    res.status(403).json({ error: 'Unauthorized!' });
  }
};

module.exports = getTokenFrom;
