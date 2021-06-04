const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { newContact, newUser } = require('./data');
const db = require('../model/db');

const Contact = require('../model/schemas/contact');
const User = require('../model/schemas/user');
const Users = require('../model/users');

describe('E2E test the routes api/contacts', () => {
  let user, token;

  // Hooks
  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newUser.email }); // deletes old test-user
    user = await Users.create(newUser); // creates new test-useer
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const issueToken = (payload, secret) => jwt.sign(payload, secret);
    token = issueToken({ id: user.id }, JWT_SECRET_KEY); // creates a token
    await Users.updateToken(user._id, token); // sets token to the user
  });

  beforeEach(async () => {
    await Contact.deleteMany(); // cleans the Contact
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newUser.email }); // removes the user which created
    await mongo.disconnect(); // disconnects from the mongo
  });

  describe('should handle get request', () => {
    //
  });
  describe('should handle post request', () => {
    //
  });
  describe('should handle put request', () => {
    //
  });
  describe('should handle delete request', () => {
    //
  });
  describe('should handle patch request', () => {
    //
  });
});
