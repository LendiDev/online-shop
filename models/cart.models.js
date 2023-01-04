class Cart {
  constructor(items = [], totalQuantity = 0, totalAmount = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalAmount = totalAmount;
  }

  addProduct = (product) => {
    const cartItem = {
      product,
      quantity: 1,
      totalPrice: product.price,
    }

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.product.id === product.id) {
        cartItem.quantity = item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price;
        this.items[i] = cartItem;

        this.totalQuantity++;
        this.totalAmount += product.price;
        return;
      }
    }

    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalAmount += product.price;
  }
}

module.exports = Cart;