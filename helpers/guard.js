const passport = require('passport');
require('../config/passport');
const { HttpCode } = require('./constants');

// Authentication
const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    let token = null;

    if (req.get('Authorization')) {
      token = req.get('Authorization').split(' ')[1];
    }

    if (!user || err || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Access is denied',
      });
    }
    req.user = user; // Ложим юзера на хранение, чтобы не ходить в базу

    return next();
  })(req, res, next);
};

module.exports = guard;

/**
 * Guard (Middleware)
 * Пускает или не пускает юзеров
 * Приходит из routes/api/contacts
 */
