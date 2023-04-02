const mongodb = require("mongodb");
const db = require("../database/database");
const { getSortBy, getOrderBy } = require("../utils/db-switches");

const ObjectId = mongodb.ObjectId;

class Product {
  constructor(productData) {
    if (productData._id) {
      this.id = productData._id.toString();
    }
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.updateImageData();
  }

  static findAll = async () => {
    const sortBy = { _id: -1 };

    const products = await db
      .getDb()
      .collection("products")
      .find()
      .sort(sortBy)
      .toArray();

    return products.map((product) => new Product(product));
  };

  static findMultiple = async (ids) => {
    const productIds = ids.map((id) => new mongodb.ObjectId(id));

    const products = await db
      .getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map((productDoc) => new Product(productDoc));
  };

  static getProducts = async (num = 3, sortBy = "id", orderBy = "ASC") => {
    const sortByQuery = {};
    const sortByName = getSortBy(sortBy);
    sortByQuery[sortByName] = getOrderBy(orderBy);

    const products = await db
      .getDb()
      .collection("products")
      .find()
      .limit(num)
      .sort(sortByQuery)
      .toArray();

    return products.map((product) => {
      return new Product(product);
    });
  };

  static findById = async (productId) => {
    let prodId;
    try {
      prodId = new ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }

    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error(`Unable find the product with id ${productId}!`);
      error.code = 404;
      throw error;
    }

    return new Product(product);
  };

  updateImageData = () => {
    this.imagePath = `tmp/product-images/${this.image}`;
    this.imageURL = `/products/assets/images/${this.image}`;
  };

  delete = () => {
    try {
      const productId = new ObjectId(this.id);
      return db.getDb().collection("products").deleteOne({ _id: productId });
    } catch (error) {
      throw error;
    }
  };

  save = async () => {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    let result;
    if (this.id) {
      try {
        const productId = new ObjectId(this.id);

        if (!this.image) {
          delete productData.image;
        }

        result = await db
          .getDb()
          .collection("products")
          .updateOne({ _id: productId }, { $set: productData });
      } catch (error) {
        error.code = 404;
        throw error;
      }
    } else {
      result = await db.getDb().collection("products").insertOne(productData);
    }

    return result;
  };

  replaceImage = async (newImage) => {
    this.image = newImage;
    this.updateImageData();
  };
}

module.exports = Product;
