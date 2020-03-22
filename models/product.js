'use strict'
module.exports = (sequelize, DataTypes) => {
  const validHelper = require('../helpers/validDate')
  class Product extends sequelize.Sequelize.Model {
    static associate(models) {
      Product.belongsTo(models.Category)
      Product.hasMany(models.Transaction)
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'product name cannot be null'
          },
          notEmpty: {
            args: true,
            msg: 'product name cannot be empty'
          }
        }
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'price cannot be null'
          },
          notEmpty: {
            args: true,
            msg: 'price cannot be empty'
          },
          customValidator(value) {
            if (value < 0) {
              throw new Error('price cannot be negative')
            }
          }
        }
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'stock cannot be null'
          },
          notEmpty: {
            args: true,
            msg: 'stock cannot be empty'
          },
          customValidator(value) {
            if (value < 0) {
              throw new Error('stock cannot be negative')
            }
          }
        }
      },
      barcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'barcode cannot be null'
          },
          notEmpty: {
            args: true,
            msg: 'barcode cannot be empty'
          }
        }
      },
      WarungId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'WarungId cannot be null'
          },
          notEmpty: {
            args: true,
            msg: 'WarungId cannot be empty'
          }
        }
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'category cannot be null'
          },
          notEmpty: {
            args: true,
            msg: 'category cannot be empty'
          }
        }
      },
      expired_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfter: {
            args: validHelper(),
            msg: 'invalid date'
          },
          isDate: {
            msg: 'invalid date'
          },
          notNull: {
            args: true,
            msg: 'Expired date cannot be null'
          },
          notEmpty: {
            args: true,
            msg: 'Expired cannot be empty'
          }
        }
      }
    },
    { sequelize }
  )
  return Product
}
