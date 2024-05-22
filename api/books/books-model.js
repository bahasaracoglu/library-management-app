const db = require("../../data/db-config");

async function getAll() {
  const books = await db("books as b").select("b.book_id", "b.name");
  return books;
}
async function create(book) {
  const [insertedBook] = await db("books as b").insert(book);
  //return getById(insertedBook);
}
module.exports = {
  getAll,
  create,
};
