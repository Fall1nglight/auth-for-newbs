const request = require('supertest');
const bcrypt = require('bcryptjs');
const { expect } = require('chai');

const app = require('../app');
const db = require('../db/connection');

const users = db.get('users');

let token;
let userId;

const loginRoute = '/auth/login';
const usersRoute = '/api/v1/users';

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

describe(`POST ${loginRoute}`, () => {
  it('should login as admin user', async () => {
    await createAdminUser();

    const response = await request(app)
      .post(loginRoute)
      .send(adminUser)
      .expect(200);

    expect(response.body).to.have.property('token');

    token = response.body.token;
  });
});

describe(`GET ${usersRoute}`, () => {
  it('should only allow admins to visit all users', async () => {
    const response = await request(app).get(usersRoute).expect(401);

    expect(response.body.message).to.equal('Un-Authorized request');
  });

  it('should only allow admins to visit all users', async () => {
    const response = await request(app)
      .get(usersRoute)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('allUsers');
  });
});

describe(`POST ${usersRoute}`, () => {
  it('should only allow admins to create users', async () => {
    const response = await request(app).post(usersRoute).expect(401);

    expect(response.body.message).to.equal('Un-Authorized request');
  });

  it('should require a username', async () => {
    const response = await request(app)
      .post(usersRoute)
      .send({ password: newUser.password })
      .set('Authorization', `Bearer ${token}`)
      .expect(422);

    expect(response.body.message).to.equal('"username" is required');
  });

  it('should require a password', async () => {
    const response = await request(app)
      .post(usersRoute)
      .send({ username: newUser.username })
      .set('Authorization', `Bearer ${token}`)
      .expect(422);

    expect(response.body.message).to.equal('"password" is required');
  });

  it('should only allow admins to create users', async () => {
    const response = await request(app)
      .post(usersRoute)
      .send(newUser)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('insertedUser');

    userId = response.body.insertedUser._id;
  });

  it('should be a unique username', async () => {
    const response = await request(app)
      .post(usersRoute)
      .send(newUser)
      .set('Authorization', `Bearer ${token}`)
      .expect(409);

    expect(response.body.message).to.equal(
      'Username is taken. Please choose another one.'
    );
  });
});

describe(`PATCH ${usersRoute}`, () => {
  it('should only allow admin users to update users', async () => {
    const response = await request(app).patch(usersRoute).expect(401);

    expect(response.body.message).to.equal('Un-Authorized request');
  });

  it('should require a username / password / role / active property', async () => {
    const response = await request(app)
      .patch(`${usersRoute}/${userId}`)
      .send({})
      .set('Authorization', `Bearer ${token}`)
      .expect(422);

    expect(response.body.message).to.equal(
      '"value" must contain at least one of [username, password, role, active]'
    );
  });

  it('should update the user', async () => {
    const response = await request(app)
      .patch(`${usersRoute}/${userId}`)
      .send({ active: false })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('updatedUser');
  });
});

describe('DELETE /api/v1/users', () => {
  it('should only allow admin users to delete users', async () => {
    const response = await request(app).patch(usersRoute).expect(401);

    expect(response.body.message).to.equal('Un-Authorized request');
  });

  it('should delete the user', async () => {
    const response = await request(app)
      .delete(`${usersRoute}/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('deletedUser');
  });
});
