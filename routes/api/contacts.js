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
  const id = req.params.contactId;
  try {
    const data = await model.getContactById(id);

    // const { code, status, message } = await model.removeContact(id);

    // res.status(code).json({
    //   status,
    //   code,
    //   message,
    // });
    /* eslint-disable */
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
    /* eslint-enable */
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
// res.send("it's delete:contactId");
// res.json({ message: 'template message' });
/*
try {
  const contacts = await listContacts();
  const newContacts = contacts.filter(contact => {
    return contact.id !== Number(contactId);
  });
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return newContacts;
} catch (error) {
  console.log(error.message);
  return;
}
*/

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
