const db = require('../db/connection');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const users = db.get('users');

const createAdminUser = async () => {
  try {
    const adminUser = await users.findOne({ role: 'admin' });
    if (adminUser) throw new Error('Admin user already exists.');

    const {
      DEFAULT_ADMIN_USERNAME: defaultUsername,
      DEFAULT_ADMIN_PASSWORD: defaultPassword,
    } = process.env;

    if (!defaultUsername || !defaultPassword)
      throw new Error('Missing variables, please check your .env file!');

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
      `Admin user successfully inserted | ${defaultUsername} @ ${defaultPassword}`
    );
  } catch (error) {
    console.log(error.message);
  } finally {
    db.close();
  }
};

createAdminUser();
