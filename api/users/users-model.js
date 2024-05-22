const db = require("../../data/db-config");

async function getById(id) {
  const user = await db("users as u")
    .where("user_id", id)
    .select("u.user_id", "u.name_surname")
    .first();
  return user;
}

async function create(user) {
  const [insertedUser] = await db("users as u").insert(user);

  return getById(insertedUser);
}

module.exports = {
  getById,
  create,
};
