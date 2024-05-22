const usersModel = require("./users-model");
//const usersMw = require("./users-middleware");
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

// brings user with id
router.get(
  "/:id",
  //usersMw.isUserExist,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await usersModel.getById(id);
      const userData = {
        id: user.user_id,
        name: user.name,
        books: { past: [], present: [] },
      };
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
