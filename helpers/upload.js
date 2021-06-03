const multer = require('multer');

require('dotenv').config();

const UPLOAD_DIR = process.env.UPLOAD_DIR;

// Indicatesin which folder to put
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },

  // Indicates how to name file
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes('image')) {
      cb(null, false);
      return;
    }

    cb(null, true);
  },
});

module.exports = upload;

/**
 * Multer is a middleware which executes file download
 *
 * diskStorage - prepares a storage in which files will be stored
 *
 * filename - defines the name
 *
 * originalname - file name which we downloads from computer
 */
