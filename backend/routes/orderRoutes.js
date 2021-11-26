const {
  getAllOrder,
  addOrder,
  getSingleOrder,
  updateOrderByPay,
  updateOrderbyDelivered,
  getOrdersByUser,
  deleteOrder,
} = require("../controllers/orderController");
const { checkLogin, checkAdmin } = require("../middleware/checkLogin");

const router = require("express").Router();

router.get("/", checkLogin, checkAdmin, getAllOrder);
router.delete("/:id/delete", checkLogin, checkAdmin, deleteOrder);
router.post("/", checkLogin, addOrder);
router.get("/user", checkLogin, getOrdersByUser);
router.get("/:id", checkLogin, getSingleOrder);
router.put("/:id/pay", updateOrderByPay);
router.put("/:id/delivered", updateOrderbyDelivered);

module.exports = router;
