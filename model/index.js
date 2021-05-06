// const fs = require('fs/promises');
const contacts = require('./contacts.json');

// GET
const listContacts = async () => contacts;

// GET by ID
const getContactById = async contactId =>
  contacts.filter(el => el.id === Number(contactId));

const removeContact = async contactId => {};

const addContact = async body => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
