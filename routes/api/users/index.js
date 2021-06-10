const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/users.js');
const guard = require('../../../helpers/guard');
const { validateUserSignup, validateUserLogin } = require('./validation');
const upload = require('../../../helpers/upload');

router.get('/verify/:verificationToken', ctrl.verify);
router.post('/signup', validateUserSignup, ctrl.reg); // return jwt-token
router.post('/login', validateUserLogin, ctrl.login);
router.post('/logout', guard, ctrl.logout); // Logout only through guard
router.get('/current', guard, ctrl.current);
router.patch('/', guard, ctrl.updateSubscription);
router.patch('/avatars', [guard, upload.single('avatar')], ctrl.avatars);

module.exports = router;

/**
 * upload.single('avatar') - avatar is a name which specified in UI Form 'name' attribute
 */
