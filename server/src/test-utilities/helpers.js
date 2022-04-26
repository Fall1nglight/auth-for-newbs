const bcrypt = require('bcryptjs');

const db = require('../db/connection');

const users = db.get('users');
const notes = db.get('notes');

const createAdminUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const insertedAdminUser = await users.insert({
      username,
      password: hashedPassword,
      role: 'admin',
      active: true,
      createdAt: new Date().getTime(),
      updatedAt: 0,
    });

    if (!insertedAdminUser)
      throw new Error('Failed to create test admin user.');
  } catch (error) {
    console.error(error);
  }
};

const clearDb = async () => {
  try {
    await users.remove({});
    await notes.remove({});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createAdminUser,
  clearDb,
};
