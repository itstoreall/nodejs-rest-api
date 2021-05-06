const express = require('express');
const router = express.Router();
const { listContacts } = require('../../model/index');

router.get('/', async (req, res, next) => {
  try {
    const response = await listContacts();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// ====
router.get('/error', function (req, res) {
  throw new Error("it's Error (from server.js)");
  // res.json({ message: "it's get /error (from server.js)" });
});
// ====

router.get('/:contactId', async (req, res, next) => {
  res.send("it's get:contactId");
  res.json({ message: 'template message' });
});

// router.post('/', async (req, res, next) => {
//   res.send("it's post on /");
//   res.json({ message: 'template message' });
// });

// router.delete('/:contactId', async (req, res, next) => {
//   res.send("it's delete:contactId");
//   res.json({ message: 'template message' });
// });

// router.patch('/:contactId', async (req, res, next) => {
//   res.send("it's patch:contactId");
//   res.json({ message: 'template message' });
// });

module.exports = router;
