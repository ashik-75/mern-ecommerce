const {
  registerUser,
  loginUser,
  getAllUser,
  getSingleUser,
  updateUserByAdmin,
  deleteUserByAdmin,
} = require("../controllers/userControllers");
const { checkLogin, checkAdmin } = require("../middleware/checkLogin");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", checkLogin, checkAdmin, getAllUser);
router
  .route("/:id")
  .get(checkLogin, checkAdmin, getSingleUser)
  .put(checkLogin, checkAdmin, updateUserByAdmin)
  .delete(checkLogin, checkAdmin, deleteUserByAdmin);

module.exports = router;
