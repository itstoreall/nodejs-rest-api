const fs = require('fs/promises');
const contacts = require('./contacts.json');
const path = require('path');
const contactsPath = path.join('./model/contacts.json');

// GET
const listContacts = async () => {
  try {
    return await fs.readFile(contactsPath, 'utf-8');
  } catch (error) {
    console.log(error.message);
  }
};

// GET by ID
const getContactById = async contactId => {
  try {
    const contacts = await listContacts();

    return await JSON.parse(contacts).find(
      el => el.id.toString() === contactId,
    );
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async body => {
  try {
    const newContacts = JSON.stringify([...contacts, body], null, 2);
    await fs.writeFile(contactsPath, newContacts);
    return body;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async contactId => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
