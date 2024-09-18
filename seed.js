const db = require("./models");
const { users, books } = require("./seedData");

const seedDatabase = async () => {
  try {
    await db.sequelize.sync({ force: true }); // Drops tables and re-creates them

    // Insert Users
    await db.User.bulkCreate(users);
    console.log("Users have been seeded.");

    // Insert Books
    await db.Book.bulkCreate(books);
    console.log("Books have been seeded.");

    process.exit();
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
};

seedDatabase();
