const express = require('express');
const router = express.Router();
const model = require('../../model/index');
const { nanoid } = require('nanoid');

// GET
router.get('/', async (req, res, next) => {
  try {
    const response = await model.listContacts();
    const data = JSON.parse(response);

    res.status(200).json({
      status: 'success',
      code: 200,
      data: { data },
    });
  } catch (error) {
    next(error);
  }
  res.end();
});

// GET by ID
router.get('/:contactId', async (req, res, next) => {
  try {
    const data = await model.getContactById(req.params.contactId);

    data
      ? res.status(200).json({
          status: 'success',
          code: 200,
          data: { data },
        })
      : res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Not found',
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
    name: name,
    email: email,
    phone: phone,
  };

  try {
    await model.addContact(body);

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { body },
    });
  } catch (error) {
    next(error);
  }
  res.end();
});

// router.delete('/:contactId', async (req, res, next) => {
//   res.send("it's delete:contactId");
//   res.json({ message: 'template message' });
// });

// router.patch('/:contactId', async (req, res, next) => {
//   res.send("it's patch:contactId");
//   res.json({ message: 'template message' });
// });

// ====
// router.get('/error', function (req, res) {
//   throw new Error("it's Error (from server.js)");
//   // res.json({ message: "it's get /error (from server.js)" });
// });
// ====

module.exports = router;
