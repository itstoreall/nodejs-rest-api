const express = require('express');
const router = express.Router();
const Contacts = require('../../model/contacts');
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateContactName,
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

// POST
router.post('/', validateCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.create(req.body);

    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } });
  } catch (error) {
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
router.patch('/:id/name', validateUpdateContactName, async (req, res, next) => {
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

module.exports = router;
