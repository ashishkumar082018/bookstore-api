const express = require("express");
const auth = require("../middleware/auth");

const {
  getUserCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cart");

const router = express.Router();

router.use(auth);

// Get the current user's cart
router.get("/", getUserCart);

// Add a book to the cart
router.post("/", addToCart);

// Remove a book from the cart
router.delete("/:itemId", removeFromCart);

module.exports = router;
