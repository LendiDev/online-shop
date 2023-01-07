const db = require("../database/database");
const { ObjectId } = require("mongodb");

class Order {
  constructor(orderData, customerData, status = "pending", date, orderId) {
    this.orderData = orderData;
    this.customerData = customerData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    this.id = orderId;
  }

  static transformOrderDocument(orderDoc) {
    return new Order(
      orderDoc.orderData,
      orderDoc.customerData,
      orderDoc.status,
      orderDoc.date,
      orderDoc._id
    );
  }

  static transformOrderDocuments(orderDocuments) {
    return orderDocuments.map(this.transformOrderDocument);
  }

  static async findAll() {
    const orderDocuments = await db
      .getDb()
      .collection("orders")
      .sort({ _id: -1 })
      .toArray();

    return this.transformOrderDocuments(orderDocuments);
  }

  static async findAllUserOrders(userId) {
    const uid = new ObjectId(userId);

    const orderDocuments = await db
      .getDb()
      .collection("orders")
      .find({ "customerData._id": uid })
      .sort({ _id: -1 })
      .toArray();

    return this.transformOrderDocuments(orderDocuments);
  }

  static async findOrder(orderId) {
    const id = new ObjectId(orderId);

    const orderDocument = await db
      .getDb()
      .collection("orders")
      .findOne({ _id: id });

    return this.transformOrderDocument(orderDocument);
  }

  save() {
    if (!this.id) {
      // create new order
      const orderData = {
        customerData: this.customerData,
        orderData: this.orderData,
        date: new Date(),
        status: this.status,
      };

      return db.getDb().collection("orders").insertOne(orderData);
    } else {
      // update order
    }
  }
}

module.exports = Order;
