const {
  addCategory,
  getAllCategory,
  deleteCategory,
  editCategory,
} = require("../controllers/categoryController");
const { checkLogin, checkAdmin } = require("../middleware/checkLogin");

const router = require("express").Router();

router.post("/", checkLogin, checkAdmin, addCategory);
router.delete("/:id/delete", checkLogin, checkAdmin, deleteCategory);
router.put("/:id/edit", checkLogin, checkAdmin, editCategory);
router.get("/", getAllCategory);

module.exports = router;
