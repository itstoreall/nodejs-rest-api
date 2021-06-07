const guard = require('../helpers/guard');
const passport = require('passport');
const { HttpCode } = require('../helpers/constants');

// Guard
describe('Unit test contacts guard', () => {
  const user = { token: '0000000000' };
  const req = { get: jest.fn(header => `Bearer ${user.token}`), user };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(data => data),
  };
  const next = jest.fn();

  it('run guard with user', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, callback) => (req, res, next) => {
        callback(null, user);
      },
    );
    guard(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('run guard without user', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, callback) => (req, res, next) => {
        callback(null, false);
      },
    );
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      ResponseBody: {
        message: 'Not authorized',
      },
    });
  });
  it('run guard with wrong token', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, callback) => (req, res, next) => {
        callback(null, { token: '33333333333' });
      },
    );
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      ResponseBody: {
        message: 'Not authorized',
      },
    });
  });
  it('run guard with error', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, callback) => (req, res, next) => {
        callback(new Error('Ups!'), {});
      },
    );
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      ResponseBody: {
        message: 'Not authorized',
      },
    });
  });
});
