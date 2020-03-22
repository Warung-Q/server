'use strict'
module.exports = (sequelize, DataTypes) => {
  class Category extends sequelize.Sequelize.Model {
    static associate(models) {
      Category.hasMany(models.Product)
    }
  }

  Category.init(
    {
      name: DataTypes.STRING
    },
    { sequelize }
  )

  return Category
}
