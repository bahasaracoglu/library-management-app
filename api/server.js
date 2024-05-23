const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const morgan = require("morgan");

const usersRouter = require("../api/users/users-router");
const booksRouter = require("../api/books/books-router");

server.use(helmet());
server.use(express.json());
server.use(cors({ origin: "http://localhost:3000" }));
server.use(morgan("dev"));

server.use("/users", usersRouter);
server.use("/books", booksRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
