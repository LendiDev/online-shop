const Product = require("./product.model");

class Cart {
  constructor(items = [], totalQuantity = 0, totalAmount = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalAmount = totalAmount;
  }

  addProduct = (product) => {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice += product.price;
    } else {
      this.items.push({
        product,
        quantity: 1,
        totalPrice: product.price,
      });
    }

    this.totalQuantity++;
    this.totalAmount += product.price;
  };

  async updatePrices() {
    const productIds = this.items.map((item) => item.product.id);
    const products = await Product.findMultiple(productIds);

    const deletableCartItemProductIds = [];

    for (const cartItem of this.items) {
      const product = products.find(
        (product) => product.id === cartItem.product.id
      );

      if (!product) {
        // product was deleted
        deletableCartItemProductIds.push(cartItem.product.id);
        continue;
      }

      // product was not deleted
      // recalculate total price of product in case price changed
      cartItem.product = product;
      cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
    }

    if (deletableCartItemProductIds.length > 0) {
      this.items = this.items.filter(
        (item) => productIds.indexOf(item.product.id) < 0
      );
    }

    // recalculate cart total
    this.totalQuantity = 0;
    this.totalPrice = 0;

    for (const item of this.items) {
      this.totalQuantity = this.totalQuantity + item.quantity;
      this.totalPrice = this.totalPrice + item.totalPrice;
    }
  }

  updateCartItem = (productId, newQuantity) => {
    newQuantity = +newQuantity; // String -> Number

    if (newQuantity > 99) newQuantity = 99;

    const existingItem = this.items.find(
      (item) => item.product.id === productId
    );

    if (existingItem) {
      if (newQuantity > 0) {
        const quantityChange = newQuantity - existingItem.quantity;
        existingItem.quantity = newQuantity;
        existingItem.totalPrice = newQuantity * existingItem.product.price;

        this.totalQuantity += quantityChange;
        this.totalAmount += quantityChange * existingItem.product.price;

        return { updatedItemPrice: existingItem.totalPrice };
      } else {
        this.totalQuantity -= existingItem.quantity;
        this.totalAmount -= existingItem.totalPrice;
        this.items = this.items.filter(
          (item) => item.product.id !== existingItem.product.id
        );
      }
    } else {
      console.log("Error! Item doesn't exist.");
    }
  };
}

module.exports = Cart;
