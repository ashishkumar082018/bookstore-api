const express = require("express");
const auth = require("../middleware/auth");
const {
  placeOrder,
  getOrderHistory,
  getOrderDetails,
} = require("../controllers/orders");

const router = express.Router();

router.use(auth);

// Place an order
router.post("/", placeOrder);

// Get order history
router.get("/", getOrderHistory);

// Get order details
router.get("/:id", getOrderDetails);

module.exports = router;
