'use strict'
module.exports = (sequelize, DataTypes) => {
  class News extends sequelize.Sequelize.Model {
    static associate(models) {
      News.belongsTo(models.Warung)
    }
  }

  News.init(
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'message cannot be null'
          },
          notEmpty: {
            args: true,
            msg: 'message cannot be empty'
          }
        }
      },
      WarungId: {
        type: DataTypes.INTEGER
      }
    },
    { sequelize }
  )
  return News
}
