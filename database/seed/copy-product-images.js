const fs = require('fs/promises');
const path = require("path");

const sourceFolder = "./database/data/product-images";
const destinationFolder = "./uploads/product-images";

const copyImagesToUploads = async () => {
  try {
    await fs.rm("./uploads", { recursive: true, force: true });
    await fs.mkdir(destinationFolder, {recursive: true});

    const files = await fs.readdir(sourceFolder);

    for (const file of files) {
      const sourceFile = path.join(sourceFolder, file);
      const destinationFile = path.join(destinationFolder, file);
      await fs.copyFile(sourceFile, destinationFile);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = copyImagesToUploads;
