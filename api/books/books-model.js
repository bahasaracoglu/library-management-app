const db = require("../../data/db-config");

async function getAll() {
  const books = await db("books as b").select("b.book_id", "b.name");
  return books;
}
module.exports = {
  getAll,
};
