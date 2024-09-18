const db = require("../models");

// Get the current user's cart
const getUserCart = async (req, res) => {
  try {
    const cart = await db.Cart.findOne({
      where: { UserId: req.user.id },
      include: db.CartItem,
    });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a book to the cart
const addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;
    const book = await db.Book.findByPk(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    let cart = await db.Cart.findOne({ where: { UserId: req.user.id } });
    if (!cart) {
      cart = await db.Cart.create({ UserId: req.user.id });
    }

    let cartItem = await db.CartItem.findOne({
      where: { CartId: cart.id, BookId: bookId },
    });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await db.CartItem.create({
        CartId: cart.id,
        BookId: bookId,
        quantity,
      });
    }

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a book from the cart
const removeFromCart = async (req, res) => {
  try {
    const cartItem = await db.CartItem.findByPk(req.params.itemId);
    if (!cartItem) return res.status(404).json({ error: "Item not found" });

    await cartItem.destroy();
    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserCart,
  addToCart,
  removeFromCart,
};
