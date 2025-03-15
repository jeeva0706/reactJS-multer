const express = require('express');
const multer = require('multer');
const path = require('path');

const imagesController = require('../Controller/imagesController');
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files to the "uploads" folder (ensure it matches the static folder in index.js)
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    // Prepend Date.now() to make the filename unique
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
router.get('/', imagesController.getAllValue);
router.post('/', upload.single('image'), imagesController.createImages);

module.exports = router;
