const db = require("../database");
const users = require("../data/users");
const { formattedUsers } = require("./format-data");
const products = require("../data/products");

const seedDB = async () => {
  await db.connectToDatabase();
  await deleteCollections();
  const products = await seedUsers();
  const users = await seedProducts();
};

const deleteCollections = async () => {
  await db.getDb().collection("users").deleteMany();
  await db.getDb().collection("products").deleteMany();
};

const seedUsers = async () => {
  return db
    .getDb()
    .collection("users")
    .insertMany(await formattedUsers(users));
};

const seedProducts = async () => {
  return db
    .getDb()
    .collection("products")
    .insertMany(products);
};

seedDB()
  .then(() => {
    console.log("DB seeded");
  })
  .catch((e) => {
    console.log("Seeding failed:", e);
  })
  .finally(() => process.exit());
