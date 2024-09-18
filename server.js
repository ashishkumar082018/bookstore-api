const express = require("express");
const dotenv = require("dotenv");
const db = require("./models");
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello i am root");
});

// Import routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/orders"));

app.get("*", (req, res) => {
  res.send("Page not found");
});

// Sync database
db.sequelize
  .sync({ logging: console.log })
  .then(() => {
    console.log("Database connected and models synchronized");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on Port - ${port}`);
});
