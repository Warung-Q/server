'use strict'
module.exports = (sequelize, DataTypes) => {
  const bcrypt = require('../helpers/bcrypt')
  class Manager extends sequelize.Sequelize.Model {
    static associate(models) {}
  }

  Manager.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'username cannot be null'
          },
          notEmpty: {
            args: true,
            msg: 'username cannot be empty'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'invalid email address format'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6],
            msg: 'password must be at least 6 characters'
          }
        }
      }
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (user, options) => {
          user.password = bcrypt.hash(user.password)
        }
      }
    }
  )
  return Manager
}
