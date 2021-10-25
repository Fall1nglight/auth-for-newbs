// custom handler because we only send back json
const handler = (req, res, next, options) =>
  res.status(options.statusCode).send({ message: options.message });

//check if the user is valid otherwise enable ratelimiting
const isValidUser = (req, res) => {
  const validUser = () => (req.user ? true : false);
  return validUser() ? 0 : 10;
};

module.exports = { handler, isValidUser };
