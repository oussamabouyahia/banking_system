const internalError = (res, error) => {
  res
    .status(error.status || 500)
    .send(error.message || "internal server issue");
};
module.exports = internalError;
