const request = require('supertest');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');

const app = require('../app');
const db = require('../db/connection');

let token;
let userId;

const users = db.get('users');

const adminUser = {
  username: 'testAdmin',
  password: 'passwordpassword',
};

const newUser = {
  username: 'testUser03',
  password: '0123456789',
};

// create admin user
const createAdminUser = async () => {
  try {
    const hashedPassword = await bcrypt.hash(adminUser.password, 12);

    const insertedAdminUser = await users.insert({
      ...adminUser,
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

describe('POST /auth/users', () => {
  it('should login as admin user', async () => {
    await createAdminUser();

    const response = await request(app)
      .post('/auth/login')
      .send(adminUser)
      .expect(200);

    expect(response.body).to.have.property('token');

    token = response.body.token;
  });
});

describe('GET /api/v1/users', () => {
  it('should only allow admins to visit all users', async () => {
    const response = await request(app).get('/api/v1/users').expect(401);

    expect(response.body.message).to.equal('Un-Authorized request');
  });

  it('should only allow admins to visit all users', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('allUsers');
  });
});

describe('POST /api/v1/users', () => {
  it('should only allow admins to create users', async () => {
    const response = await request(app).post('/api/v1/users').expect(401);

    expect(response.body.message).to.equal('Un-Authorized request');
  });

  it('should require a username', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({ password: newUser.password })
      .set('Authorization', `Bearer ${token}`)
      .expect(422);

    expect(response.body.message).to.equal('"username" is required');
  });

  it('should require a password', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({ username: newUser.username })
      .set('Authorization', `Bearer ${token}`)
      .expect(422);

    expect(response.body.message).to.equal('"password" is required');
  });

  // it('should only allow unique username', async () => {
  //   const response = await request(app)
  //     .post('/api/v1/users')
  //     .send(newUser)
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(200);

  //   expect(response.body).to.have.property('insertedUser');
  // });

  it('should only allow admins to create users', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send(newUser)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('insertedUser');

    userId = response.body.insertedUser._id;
  });
});
