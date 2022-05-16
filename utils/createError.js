module.exports = (message, statueCode) => {
  const error = new Error(message);
  error.statusCode = statueCode;
  throw error;
};
