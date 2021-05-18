const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/contacts');

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateContactFavorite,
} = require('./validation');

// GET
router.get('/', ctrl.getAll);

// GET by ID
router.get('/:id', ctrl.getById);

// POST
router.post('/', validateCreateContact, ctrl.create);

// DELETE
router.delete('/:id', ctrl.remove);

// PUT
router.put('/:id', validateUpdateContact, ctrl.update);

// PATCH
router.patch('/:id/favorite', validateUpdateContactFavorite, ctrl.update);

module.exports = router;
