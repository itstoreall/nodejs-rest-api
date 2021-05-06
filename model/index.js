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
      contact => contact.id.toString() === contactId,
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

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();

    const filteredContacts = await JSON.parse(contacts).filter(contact => {
      return contact.id.toString() !== contactId;
    });

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    const status = filteredContacts.length !== JSON.parse(contacts).length;

    return status
      ? { status: 'success', code: 200, message: 'contact deleted' }
      : { status: 'error', code: 404, message: 'Not found' };
  } catch (error) {
    console.log(error.message);
  }
};

// const contacts = await listContacts();
//   const newContacts = contacts.filter(contact => {
//     return contact.id !== Number(contactId);
//   });
//   await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
//   return newContacts;
// } catch (error) {
//   console.log(error.message);
//   return;
// }

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
