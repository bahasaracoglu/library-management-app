const booksModel = require("./books-model");

const router = require("express").Router();

// brings all books
router.get("/", async (req, res, next) => {
  try {
    const books = await booksModel.getAll();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
