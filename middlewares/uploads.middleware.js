const multer = require("multer");

const { v4: uuidv4 } = require("uuid");

const imageUploadStorageConfig = multer.diskStorage({
  destination: "uploads/product-images",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${uuidv4()}-${file.originalname}`);
  },
});

const imageUploadMulter = multer({
  storage: imageUploadStorageConfig,
});

const imageUploadMiddleware = imageUploadMulter.single("image");

module.exports = {
  imageUploadMiddleware,
};
