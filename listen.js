const db = require("./database/database");
const app = require("./app");

const PORT = process.env.PORT || 3000;

db.connectToDatabase()
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
      });
    }
  })
  .catch((error) => {
    console.log("Failed to connect to database");
    console.log(error);
  });
