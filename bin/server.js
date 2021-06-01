const app = require('../app');
const db = require('../model/db');
const createFolderIsNotExist = require('../helpers/create_dir');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = process.env.UPLOAD_DIR;
const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;

// Starts the SERVER
db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOAD_DIR);
    await createFolderIsNotExist(AVATARS_OF_USERS);
    console.log(`Database connection successful. PORT: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server not run. Error: ${err.message}`);
  process.exit(1);
});
