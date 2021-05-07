const fs = require('fs/promises');
const contacts = require('./contacts.json');
const path = require('path');
const contactsPath = path.join('./model/contacts.json');

// GET
const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(response);

    return { status: 'success', code: 200, contacts };
  } catch (error) {
    console.log(error.message);
  }
};

// GET by ID
const getContactById = async contactId => {
  try {
    const { contacts } = await listContacts();
    const contact = await contacts.find(
      contact => contact.id.toString() === contactId,
    );

    return contact
      ? { status: 'success', code: 200, contact }
      : { status: 'error', code: 404, message: 'Not found' };
  } catch (error) {
    console.log(error.message);
  }
};

// ADD
const addContact = async body => {
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

// DEL
const removeContact = async contactId => {
  try {
    const { contacts } = await listContacts();

    const filteredContacts = await contacts.filter(
      contact => contact.id.toString() !== contactId,
    );

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));

    const status = filteredContacts.length !== contacts.length;

    return status
      ? { status: 'success', code: 200, message: 'contact deleted' }
      : { status: 'error', code: 404, message: 'Not found' };
  } catch (error) {
    console.log(error.message);
  }
};

// PATCH
const updateContact = async (contactId, body) => {
  const { contacts } = await listContacts();

  // {"message": "missing fields"}

  const cont = await contacts.map(contact => {
    return contact.id.toString() === contactId
      ? (contact = {
          ...contact,
          ...body,
        })
      : contact;
  });

  await fs.writeFile(contactsPath, JSON.stringify(cont, null, 2));

  return 'Done!!!';
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
