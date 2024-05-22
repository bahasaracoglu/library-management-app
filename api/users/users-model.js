const db = require("../../data/db-config");

async function getAll() {
  const users = await db("users as u").select("u.user_id", "u.name");
  return users;
}

async function getById(id) {
  const user = await db("users as u")
    .where("user_id", id)
    .select("u.user_id", "u.name")
    .first();
  return user;
}

async function create(user) {
  const [insertedUser] = await db("users as u").insert(user);

  return getById(insertedUser);
}

module.exports = {
  getAll,
  getById,
  create,
};
