const bcrypt = require("bcryptjs");

const users = [
  {
    username: "ashish",
    password: bcrypt.hashSync("ashish", 10), // Passwords should be hashed
  },
  {
    username: "admin",
    password: bcrypt.hashSync("admin", 10),
  },
];

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 10.99,
    stock: 5,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 8.99,
    stock: 10,
  },
  {
    title: "1984",
    author: "George Orwell",
    price: 12.99,
    stock: 8,
  },
];

module.exports = {
  users,
  books,
};
