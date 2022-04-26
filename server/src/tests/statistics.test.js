const request = require('supertest');
const { expect } = require('chai');

const app = require('../app');
const db = require('../db/connection');
const helpers = require('../test-utilities/helpers');

let token;

const users = db.get('users');

const adminUser = {
  username: 'testAdmin02',
  password: 'passwordpassword',
};

// törölni kell a meglévő felhasználókat, jegyzeteket
// létre kell hozni egy admin fiókot és jegyzeteket
// hogy legyen adat a statisztikához

// tesztek
// should require to be logged in
// should require to be an admin user
// should display 0 as value
// because there are no data

// ==> insert some data
// should display x as value
