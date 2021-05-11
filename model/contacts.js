const db = require('./db');
const { ObjectID } = require('mongodb');

// Helper
const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

// GET
const getAll = async () => {
  const collection = await getCollection(db, 'contacts');
  const results = collection.find({}).toArray();
  return results;
};

// GET by ID
const getById = async id => {
  const collection = await getCollection(db, 'contacts');
  const [result] = await collection.find({ _id: new ObjectID(id) }).toArray();
  console.log(result._id.getTimestamp()); // get Document creating time
  return result;
};

// POST
const create = async body => {
  const collection = await getCollection(db, 'contacts');

  const record = {
    ...body,
  };

  const {
    ops: [result],
  } = await collection.insertOne(record);
  return result;
};

// DELETE
const remove = async id => {
  const collection = await getCollection(db, 'contacts');
  const { value: result } = await collection.findOneAndDelete({
    _id: new ObjectID(id),
  });
  return result;
};

// UPDATE
const update = async (id, body) => {
  const collection = await getCollection(db, 'contacts');
  const { value: result } = await collection.findOneAndUpdate(
    {
      _id: new ObjectID(id),
    },
    { $set: body },
    { returnOriginal: false },
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
