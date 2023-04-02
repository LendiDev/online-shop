const db = require("./database/database");
const app = require("./app");

const PORT = process.env.PORT || 3000;

db.connectToDatabase()
  .then((client) => {
    client.connect((err) => {
      if (err) {
        console.error(err);
        return false;
      }
      // connection to mongo is successful, listen for requests
      app.listen(PORT, () => {
        console.log("listening for requests");
      });
    });

    // if (process.env.NODE_ENV !== "test") {
    //   app.listen(PORT);
    //   console.log(`Server listening on port: ${PORT}`);
    // }
  })
  .catch((error) => {
    console.log("Failed to connect to database");
    console.log(error);
  });

// db.connectToDatabase().connect((err) => {
//   if (err) {
//     console.error(err);
//     return false;
//   }

//   app.listen(PORT, () => {
//     console.log("listening for requests");
//   });
// });
