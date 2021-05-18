const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const Users = require('../model/users');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const opts = {
  // Как доставать (будет искать 'Bearer JWT_TOKEN' в заголовках)
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY, // Как расшифровывать
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await Users.findById(payload.id);

      // Не нашли юзера по id
      if (!user) {
        return done(new Error('User not found'), false);
      }

      // У юзера нет токена (разлогинился)
      if (!user.token) {
        return done(null, false);
      }

      // В остальных случаях возвращаем юзера
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }),
);

/**
 * Приходит payload
 * Расшифровывается
 * Достаем id и ищем юзера
 * Если юзера не нашли - генерируем ошибку
 * Если юзер есть, но токена нет
 *
 * Done бросается в passport.authenticate в guard.js
 */
