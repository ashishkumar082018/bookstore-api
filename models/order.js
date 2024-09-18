module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  return Order;
};
