const db = require("../database/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.imagePath = `uploads/product-images/${productData.image}`;
    this.imageURL = `/products/assets/images/${productData.image}`;
  }

  save = async () => {
    const result = await db.getDb().collection("products").insertOne({
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    });

    return result;
  };
}

module.exports = Product;
