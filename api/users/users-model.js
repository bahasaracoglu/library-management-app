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

async function getUserWithLoans(userId) {
  const user = await getById(userId);

  const loans = await db("loans as l")
    .join("books as b", "l.book_id", "b.book_id")
    .where({ "l.user_id": userId })
    .select(
      "b.name",
      "l.loan_date",
      "l.return_date",
      "l.user_score as userScore"
    );

  const past = loans
    .filter((loan) => loan.return_date)
    .map((loan) => {
      const { name, userScore } = loan;
      return {
        name,
        ...(userScore !== null && { userScore }),
      };
    });

  const present = loans
    .filter((loan) => !loan.return_date)
    .map((loan) => {
      const { name, userScore } = loan;
      return {
        name,
        ...(userScore !== null && { userScore }),
      };
    });

  return {
    id: user.user_id,
    name: user.name,
    books: { past, present },
  };
}

async function create(user) {
  const [insertedUser] = await db("users as u").insert(user);
  //return getById(insertedUser);
}

module.exports = {
  getAll,
  getById,
  create,
  getUserWithLoans,
};
