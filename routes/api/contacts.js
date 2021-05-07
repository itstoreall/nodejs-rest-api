const express = require('express');
const router = express.Router();
const model = require('../../model/index');
const { nanoid } = require('nanoid');

// GET
router.get('/', async (_, res, next) => {
  try {
    const { code, status, contacts } = await model.listContacts();

    res.status(code).json({
      status,
      code,
      contacts,
    });
  } catch (error) {
    next(error);
  }
  res.end();
});

// GET by ID
router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const { code, status, contact, message } = await model.getContactById(id);

    res.status(code).json({
      status,
      code,
      message,
      contact,
    });
  } catch (error) {
    next(error);
  }
  res.end();
});

// POST
router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const body = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  try {
    const { code, status, contact, message } = await model.addContact(body);

    res.status(code).json({
      status,
      code,
      contact,
      message,
    });
  } catch (error) {
    next(error);
  }
  res.end();
});

// DEL
router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const { code, status, message } = await model.removeContact(id);

    res.status(code).json({
      status,
      code,
      message,
    });
  } catch (error) {
    next(error);
  }
  res.end();
});

// PATCH
router.patch('/:contactId', async (req, res, next) => {
  res.send("it's patch:contactId");
  res.json({ message: 'template message' });
});

// ====
// router.get('/error', function (req, res) {
//   throw new Error("it's Error (from server.js)");
//   // res.json({ message: "it's get /error (from server.js)" });
// });
// ====

module.exports = router;
