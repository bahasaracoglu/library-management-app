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

// creates book with name
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    await booksModel.create({ name: name });
    res.status(201).json("");
  } catch (error) {
    next(error);
  }
});

// creates book with name
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const bookWithId = await booksModel.getBookWithId(id);
    res.status(200).json(bookWithId);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
