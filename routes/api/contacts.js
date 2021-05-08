const express = require('express');
const router = express.Router();
const Contacts = require('../../model/contacts');

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
// router.get('/:id', async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const { code, status, contact, message } = await Contacts.getById(id);

//     res.status(code).json({
//       status,
//       code,
//       message,
//       contact,
//     });
//   } catch (error) {
//     next(error);
//   }
//   res.end();
// });

// POST
router.post('/', async (req, res, next) => {
  try {
    const contact = await Contacts.create(req.body);

    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
});

// DEL
router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const { code, status, message } = await Contacts.remove(id);

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
router.patch('/:id', async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;

  try {
    const response = await Contacts.update(id, body);
    console.log('response:', response);
  } catch (error) {
    next(error);
  }
  res.end();
});

module.exports = router;
