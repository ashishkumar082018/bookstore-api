const Sequelize = require("sequelize");
const sequelize = require("../config/database");

// Import models
const User = require("./user")(sequelize, Sequelize);
const Book = require("./book")(sequelize, Sequelize);
const Cart = require("./cart")(sequelize, Sequelize);
const CartItem = require("./cartItem")(sequelize, Sequelize);
const Order = require("./order")(sequelize, Sequelize);
const OrderItem = require("./orderItem")(sequelize, Sequelize);

// Define relationships
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);
CartItem.belongsTo(Book);

Order.belongsTo(User);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Book);

const db = {
  Sequelize,
  sequelize,
  User,
  Book,
  Cart,
  CartItem,
  Order,
  OrderItem,
};

module.exports = db;
