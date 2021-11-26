const {
  getAllProducts,
  addProduct,
  removeProduct,
  updateProduct,
  getSingleProduct,
} = require("../controllers/productController");
const { checkLogin, checkAdmin } = require("../middleware/checkLogin");

const router = require("express").Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
router.post("/products", checkLogin, checkAdmin, addProduct);
router.delete("/products/:id", checkLogin, checkAdmin, removeProduct);
router.put("/products/:id", checkLogin, checkAdmin, updateProduct);

module.exports = router;
