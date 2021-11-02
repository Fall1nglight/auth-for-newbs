const auth = require('../auth/auth.routes');
const notes = require('../api/v1/notes/notes.routes');
const users = require('../api/v1/users/users.routes');

module.exports = {
  auth,
  notes,
  users,
};
