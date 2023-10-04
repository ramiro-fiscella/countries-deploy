require("dotenv").config();
const app = require("./src/app");
const { conn } = require("./src/db.js");

const PORT = process.env.PORT || 3001;

conn
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Error while setting up the server: ", error));
