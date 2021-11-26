const errorHandler = (err, req, res, next) => {
  if (err) {
    res.send(err.message);
  }
};

module.exports = { errorHandler };
