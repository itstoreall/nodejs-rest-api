const fs = require('fs/promises');
// const contacts = require('./contacts.json');
const path = require('path');
const contactsPath = path.join('./model/contacts.json');
const { nanoid } = require('nanoid');

// GET
const getAll = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  return await JSON.parse(contacts);
};

// GET by ID
const getById = async id => {
  const contacts = await getAll();
  const contactArr = contacts.contacts;

  return contactArr.find(contact => contact.id === id);
};

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

// UPDATE
const update = async (id, body) => {
  const contacts = await getAll();
  const contactArr = contacts.contacts;

  const contact = contactArr.find(contact => contact.id === id);
  const updatedContact = Object.assign(contact, body);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatedContact.id ? updatedContact : null;
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
