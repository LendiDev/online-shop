const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const getImage = async (req, res, next) => {
  const { image_key } = req.params;

  try {
    let imageObject = await s3
      .getObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image_key,
      })
      .promise();

    res.type(imageObject.Metadata.mimetype);
    res.send(Buffer.from(imageObject.Body, "base64"));
  } catch (e) {
    return res.status(404).send("Not found");
  }
};

module.exports = getImage;
