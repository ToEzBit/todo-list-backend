module.exports = (err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {
    err.statusCode = 400;
  }
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    err.statusCode = 401;
  }
  console.log(err);
  res.status(err.statusCode || 500).json({ message: err.message });
};
