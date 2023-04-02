const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

const { v4: uuidv4 } = require("uuid");

const s3 = new S3Client();

const imageUploadStorageConfig = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, { mimeType: file.mimetype });
  },
  key: function (req, file, cb) {
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
