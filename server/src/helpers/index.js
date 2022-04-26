const respondWithError = (res, next, error) => {
  // set default statusCode to 500 in case it is not set with res.status

  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  next(error);
};

module.exports = {
  respondWithError,
};
