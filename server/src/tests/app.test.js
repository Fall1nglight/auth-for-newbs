const request = require('supertest');
// const mocha = require('mocha');
const { expect } = require('chai');
const app = require('../app');

describe('app - GET /', () => {
  it('should respond with a message', async () => {
    const response = await request(app).get('/').expect(200);
    expect(response.body.message).to.equal('Homepage');
  });
});
