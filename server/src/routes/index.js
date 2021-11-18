const auth = require('../auth/auth.routes');
const notes = require('../api/v1/notes/notes.routes');
const users = require('../api/v1/users/users.routes');
const statistics = require('../api/v1/statistics/statistics.routes');
const public = require('../api/v1/public/public.routes');

module.exports = {
  auth,
  notes,
  users,
  statistics,
  public,
};
