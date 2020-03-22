'use strict'
module.exports = (sequelize, DataTypes) => {
  class Transaction extends sequelize.Sequelize.Model {
    static associate(models) {
      Transaction.belongsTo(models.Product)
    }
  }

  Transaction.init(
    {
      name: DataTypes.STRING,
      ProductId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.FLOAT,
      WarungId: DataTypes.INTEGER
    },
    {
      sequelize
    }
  )

  return Transaction
}
