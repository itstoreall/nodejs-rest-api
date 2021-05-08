const fs = require('fs/promises');
const contacts = require('./contacts.json');
const path = require('path');
const contactsPath = path.join('./model/contacts.json');
const { nanoid } = require('nanoid');

// GET
const getAll = async () => contacts;

// GET by ID
const getById = async id => {
  const contacts = await getAll();
  const contactArr = contacts.contacts;

  return contactArr.find(contact => contact.id === id);
};

/*
const getById = async id => {
  try {
    const { contacts } = await getAll();
    const contact = await contacts.find(
      contact => contact.id.toString() === id,
    );

    return contact
      ? { status: 'success', code: 200, contact }
      : { status: 'error', code: 404, message: 'Not found' };
  } catch (error) {
    console.log(error.message);
  }
};
*/

// POST
const create = async body => {
  const id = nanoid();

  const record = {
    id,
    ...body,
  };

  const contacts = await getAll();
  const contactArr = contacts.contacts;
  contactArr.push(record);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return record;
};

/*
const create = async body => {
  const values = Object.values(body).filter(value => value !== '');

  if (values.length !== 4) {
    return {
      status: 'error',
      code: 400,
      message: 'missing required name field',
    };
  } else {
    try {
      const newContacts = JSON.stringify([...contacts, body], null, 2);
      await fs.writeFile(contactsPath, newContacts);

      return { status: 'success', code: 201, contact: body };
    } catch (error) {
      console.log(error.message);
    }
  }
};
*/

// DEL
const remove = async id => {
  const contacts = await getAll();
  const contactArr = contacts.contacts;

  const updatedContacts = contactArr.filter(
    contact => contact.id.toString() !== id,
  );

  await fs.writeFile(
    contactsPath,
    JSON.stringify({ contacts: updatedContacts }, null, 2),
  );

  const status = updatedContacts.length < contactArr.length;

  return status;
};

// PUT
const update = async (id, body) => {
  const contacts = await getAll();
  const contactArr = contacts.contacts;

  const contact = contactArr.find(contact => contact.id === id);
  const updatedContact = Object.assign(contact, body);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatedContact.id ? updatedContact : null;
  // console.log('updatedContact-', updatedContact);
};

// PATCH
// const update = async (id, body) => {
//   const { contacts } = await getAll();

//   // {"message": "missing fields"}

//   const cont = await contacts.map(contact => {
//     return contact.id.toString() === id
//       ? (contact = {
//           ...contact,
//           ...body,
//         })
//       : contact;
// });

//   await fs.writeFile(contactsPath, JSON.stringify(cont, null, 2));

//   return 'Done!!!';
// };

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
