const Image = require('../Models/imagesModels');

exports.getAllValue = async (req, res) => {
  try {
    const values = await Image.find();
    res.json(values);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images", error: error.message });
  }
};

exports.createImages = async (req, res) => {
  try {
    const newImage = new Image({
      image: req.file ? req.file.filename : null
    });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
