const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/contacts');
const guard = require('../../../helpers/guard');
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateContactFavorite,
  validateObjectId,
} = require('./validation');

// GET
router.get('/', guard, ctrl.getAll);

// GET by ID
router.get('/:id', validateObjectId, guard, ctrl.getById);

// POST
router.post('/', guard, validateCreateContact, ctrl.create);

// DELETE
router.delete('/:id', validateObjectId, guard, ctrl.remove);

// PUT
router.put('/:id', validateObjectId, guard, validateUpdateContact, ctrl.update);

// PATCH
router.patch(
  '/:id/favorite',
  validateObjectId,
  guard,
  validateUpdateContactFavorite,
  ctrl.update,
);

module.exports = router;
