const request = require('supertest');
const { expect } = require('chai');

const app = require('../app');
const db = require('../db/connection');

const users = db.get('users');

let token;

const signupRoute = '/auth/signup';
const loginRoute = '/auth/login';
const checkUserRoute = '/auth/checkuser';

const newUser = {
  username: 'testUser01',
  password: '0123456789',
};

describe(`POST ${signupRoute}`, () => {
  before(async () => {
    try {
      await users.remove({});
    } catch (error) {
      console.error(error);
    }
  });

  it('should require a username', async () => {
    const response = await request(app)
      .post(signupRoute)
      .send({ password: newUser.password })
      .expect(422);

    expect(response.body.message).to.equal('"username" is required');
  });

  it('should require a password', async () => {
    const response = await request(app)
      .post(signupRoute)
      .send({ username: newUser.username })
      .expect(422);

    expect(response.body.message).to.equal('"password" is required');
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post(signupRoute)
      .send(newUser)
      .expect(200);

    expect(response.body).to.have.property('token');
  });

  it('should not allow a user with an existing username', async () => {
    const response = await request(app)
      .post(signupRoute)
      .send(newUser)
      .expect(409);

    expect(response.body.message).to.equal(
      'Username is taken. Please choose another one.'
    );
  });
});

describe(`POST ${loginRoute}`, () => {
  it('should require a username', async () => {
    const response = await request(app)
      .post(loginRoute)
      .send({ password: newUser.password })
      .expect(422);

    expect(response.body.message).to.equal('"username" is required');
  });

  it('should require a password', async () => {
    const response = await request(app)
      .post(loginRoute)
      .send({ username: newUser.username })
      .expect(422);

    expect(response.body.message).to.equal('"password" is required');
  });

  it('should only allow valid users to login', async () => {
    const response = await request(app)
      .post(loginRoute)
      .send({ ...newUser, password: 'wrongPassword123' })
      .expect(422);

    expect(response.body.message).to.equal(
      'Invalid login credentials. Please try again.'
    );
  });

  it('should only allow valid users to login', async () => {
    const response = await request(app)
      .post(loginRoute)
      .send(newUser)
      .expect(200);

    expect(response.body).to.have.property('token');
    token = response.body.token;
  });
});

describe(`GET ${checkUserRoute}`, () => {
  it('should validate the Authorization header', async () => {
    const response = await request(app).get(checkUserRoute).expect(200);
    // eslint-disable-next-line no-unused-expressions
    expect(response.body).to.be.empty;
  });

  it('should respond with req.user', async () => {
    const response = await request(app)
      .get(checkUserRoute)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('user');
  });
});
