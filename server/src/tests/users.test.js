const request = require('supertest');
const { expect } = require('chai');

const app = require('../app');
const db = require('../db/connection');

describe('POST /api/v1/signup', () => {});

// todo decide to use admin usernam & password from .env
// todo or create an admin user inside test

// describe('GET /api/v1/users', () => {
//   it()
// })
