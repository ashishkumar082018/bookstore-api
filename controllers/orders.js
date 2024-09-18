const db = require("../models");

// Place an order
const placeOrder = async (req, res) => {
  try {
    let cart = await db.Cart.findOne({
      where: { UserId: req.user.id },
      include: {
        model: db.CartItem,
        include: db.Book,
      },
    });

    if (!cart || cart.CartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const orderItems = cart.CartItems.map((item) => {
      if (!item.Book) {
        throw new Error("Book data is missing for item");
      }
      return {
        BookId: item.BookId,
        quantity: item.quantity,
        price: item.Book.price,
      };
    });

    const totalPrice = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const order = await db.Order.create({
      UserId: req.user.id,
      totalPrice,
    });

    await db.OrderItem.bulkCreate(
      orderItems.map((item) => ({
        OrderId: order.id,
        ...item,
      }))
    );

    await cart.destroy();
    res.status(201).json(order);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get order history
const getOrderHistory = async (req, res) => {
  try {
    const orders = await db.Order.findAll({
      where: { UserId: req.user.id },
      include: db.OrderItem,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order details
const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await db.Order.findByPk(orderId, {
      include: db.OrderItem,
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  placeOrder,
  getOrderHistory,
  getOrderDetails,
};
