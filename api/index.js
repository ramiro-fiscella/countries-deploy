require("dotenv").config();
const server = require("./src/server");
const { conn } = require("./src/db.js");

const DB_PORT = process.env.DB_PORT || 3001;

conn
  .sync({ force: false })
  .then(() => {
    server.listen(DB_PORT, () => {
      console.log(`Server listening on DB_PORT ${DB_PORT}`);
    });
  })
  .catch((error) => console.log("Error while setting up the server: ", error));
