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

  updateCartItem = (productId, newQuantity) => {
    newQuantity = +newQuantity; // String -> Number
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
        console.log("remove existing item");
      }
    } else {
      console.log("Error! item does not exist! Ignore request");
    }
  };
}

module.exports = Cart;
