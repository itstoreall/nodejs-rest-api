const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/users.js');
const guard = require('../../../helpers/guard');

router.post('/register', ctrl.reg); // return jwt-token
router.post('/login', ctrl.login);
router.post('/logout', guard, ctrl.logout); // Logout only through guard

module.exports = router;
