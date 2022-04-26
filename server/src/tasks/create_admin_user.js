const bcrypt = require('bcryptjs');
const db = require('../db/connection');
require('dotenv').config();

const users = db.get('users');

const createAdminUser = async () => {
  try {
    const adminUsers = await users.find({ role: 'admin' });
    if (adminUsers.length)
      throw new Error(
        `Admin ${adminUsers.length > 1 ? 'users' : 'user'} already ${
          adminUsers.length > 1 ? 'exist.' : 'exists.'
        }`
      );

    const {
      DEFAULT_ADMIN_USERNAME: defaultUsername,
      DEFAULT_ADMIN_PASSWORD: defaultPassword,
    } = process.env;

    if (!defaultUsername || !defaultPassword)
      throw new Error(
        'Missing default configuration variables, please check your .env file!'
      );

    const hashedPassword = await bcrypt.hash(defaultPassword, 12);

    const insertedUser = await users.insert({
      username: defaultUsername,
      password: hashedPassword,
      role: 'admin',
      active: true,
      createdAt: new Date().getTime(),
      updatedAt: 0,
    });

    if (!insertedUser)
      throw new Error('Failed to inser admin user. Please try again later');

    console.log(
      `Admin user successfully inserted => ${defaultUsername} @ ${defaultPassword}`
    );
  } catch (error) {
    console.error(error.message);
  } finally {
    db.close();
  }
};

createAdminUser();
