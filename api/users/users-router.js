const usersModel = require("./users-model");
const usersMw = require("./users-middleware");
const router = require("express").Router();

// brings all users
router.get("/", async (req, res, next) => {
  try {
    const users = await usersModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// creates user with name
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    await usersModel.create({ name: name });
    res.status(201).json("");
  } catch (error) {
    next(error);
  }
});

// brings user with id and their loans
router.get("/:id", usersMw.isUserExist, async (req, res, next) => {
  try {
    const id = req.params.id;
    const userWithLoans = await usersModel.getUserWithLoans(id);
    res.status(200).json(userWithLoans);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
