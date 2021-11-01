// custom handler because we only send back json
const handler = (_req, res, _next, options) =>
  res.status(options.statusCode).send({ message: options.message });

// check if the user is valid otherwise enable ratelimiting
const isValidUser = (req) => {
  const validUser = () => !!req.user;
  return validUser() ? 0 : 10;
};

module.exports = { handler, isValidUser };
