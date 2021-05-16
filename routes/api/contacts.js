const express = require('express');
const router = express.Router();
const Contacts = require('../../model/contacts');
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateContactFavorite,
} = require('./validation');

// GET
router.get('/', async (_, res, next) => {
  try {
    const data = await Contacts.getAll();

    return res.status(200).json({ status: 'success', code: 200, data });
  } catch (error) {
    next(error);
  }
});

// GET by ID
router.get('/:id', async (req, res, next) => {
  try {
    const contact = await Contacts.getById(req.params.id);
    console.log(contact); // toObject

    if (contact) {
      return res.status(200).json({ status: 'success', code: 200, contact });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' }); // toJSON
  } catch (error) {
    next(error);
  }
});

// POST
router.post('/', validateCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.create(req.body);

    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } });
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
    }
    next(error);
  }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const contacts = await Contacts.remove(req.params.id);

    if (contacts) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
      });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

// PUT
router.put('/:id', validateUpdateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.update(req.params.id, req.body);

    if (contact) {
      return res.status(200).json({ status: 'success', code: 200, contact });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

// PATCH
router.patch(
  '/:id/favorite',
  validateUpdateContactFavorite,
  async (req, res, next) => {
    try {
      const contact = req.body.hasOwnProperty('favorite') // eslint-disable-line
        ? await Contacts.update(req.params.id, req.body)
        : { message: 'missing field favorite' };

      if (contact) {
        return res.status(200).json({ status: 'success', code: 200, contact });
      }
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not Found' });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
