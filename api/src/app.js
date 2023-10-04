const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

// Create express app
const server = express();

// Middlewares
server.use(morgan("dev")); // Log HTTP requests
server.use(express.json()); //  parses incoming JSON data and makes it available in req.body

server.use(cors());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(router); // handle all the routes defined in the routes file

module.exports = server;
