const Contact = require('./schemas/contact');

// GET
const getAll = async userId => {
  const results = await Contact.find({ owner: userId }).populate({
    // Substants the value and fields of the document instead of ID
    path: 'owner',
    select: 'name email gender -_id', // -_id (removes the field from output)
  });
  return results;
};

// GET by ID
const getById = async (userId, id) => {
  const result = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'name email gender -_id',
  });
  return result;
};

// POST
const create = async body => {
  const result = await Contact.create(body);
  return result;
};

// DELETE
const remove = async (userId, id) => {
  const result = await Contact.findByIdAndRemove({ _id: id, owner: userId });
  return result;
};

// UPDATE
const update = async (userId, id, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true },
  );
  return result;
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
