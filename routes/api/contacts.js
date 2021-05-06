const express = require('express');
const router = express.Router();
const model = require('../../model/index');

router.get('/', async (_, res, next) => {
  try {
    res.json(await model.listContacts());
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    res.json(await model.getContactById(req.params.contactId));
  } catch (error) {
    next(error);
  }
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

// ====
// router.get('/error', function (req, res) {
//   throw new Error("it's Error (from server.js)");
//   // res.json({ message: "it's get /error (from server.js)" });
// });
// ====

module.exports = router;
